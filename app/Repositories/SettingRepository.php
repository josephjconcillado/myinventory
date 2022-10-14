<?php

namespace App\Repositories;

use App\Models\Setting;
use Exception;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class SettingRepository
 */
class SettingRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'key',
        'value',
    ];

    /**
     * @var string[]
     */
    protected $allowedFields = [
        'key',
        'value',
    ];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model(): string
    {
        return Setting::class;
    }

    /**
     * @param $input
     *
     * @return mixed
     */
    public function updateSettings($input)
    {
        try {
            DB::beginTransaction();
            if (isset($input['logo']) && !empty($input['logo'])) {
                /** @var Setting $setting */
                $setting = Setting::where('key', '=', 'logo')->first();
//                $setting->clearMediaCollection(Setting::PATH);
                $media = $setting->addMedia($input['logo'])->toMediaCollection(Setting::PATH, config('app.media_disc'));
                $setting = $setting->refresh();
                $setting->update(['value' => $media->getFullUrl()]);
                $input['logo'] = $setting->getLogoAttribute();
            }

            $settingInputArray = Arr::only($input, [
                'currency', 'email', 'company_name', 'phone', 'developed', 'footer', 'default_language',
                'default_customer', 'default_warehouse', 'stripe_key', 'stripe_secret', 'sms_gateway', 'twillo_sid',
                'twillo_token', 'twillo_from', 'smtp_host', 'smtp_port', 'smtp_username', 'smtp_password',
                'smtp_Encryption', 'address', 'show_version_on_footer', 'country', 'state', 'city', 'postcode',
                'date_format', 'purchase_code', 'purchase_return_code', 'sale_code', 'sale_return_code', 'expense_code',
            ]);

            foreach ($settingInputArray as $key => $value) {
                if ($key == "show_version_on_footer") {
                    if (empty($value)) {
                        Setting::where('key', '=', $key)->first()->update(['value' => false]);
                    }
                }
                if (isset($value) && !empty($value)) {
                    Setting::where('key', '=', $key)->first()->update(['value' => $value]);
                }
            }
            $input['logo'] = Setting::where('key', '=', 'logo')->first()->logo;
            DB::commit();

            return $input;
        } catch (Exception $exception) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($exception->getMessage());
        }
    }
}
