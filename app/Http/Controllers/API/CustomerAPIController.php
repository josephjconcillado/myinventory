<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Resources\CustomerCollection;
use App\Http\Resources\CustomerResource;
use App\Repositories\CustomerRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Prettus\Validator\Exceptions\ValidatorException;

/**
 * Class CustomerAPIController
 */
class CustomerAPIController extends AppBaseController
{
    /** @var CustomerRepository */
    private $customerRepository;

    public function __construct(CustomerRepository $customerRepository)
    {
        $this->customerRepository = $customerRepository;
    }

    /**
     * @param Request $request
     *
     *
     * @return CustomerCollection
     */
    public function index(Request $request)
    {
        $perPage = getPageSize($request);
        $customers = $this->customerRepository->paginate($perPage);
        CustomerResource::usingWithCollection();

        return new CustomerCollection($customers);
    }

    /**
     * @param CreateCustomerRequest $request
     * @throws ValidatorException
     *
     * @return CustomerResource
     */
    public function store(CreateCustomerRequest $request)
    {
        $input = $request->all();
        $customer = $this->customerRepository->create($input);

        return new CustomerResource($customer);
    }

    /**
     * @param $id
     * @return CustomerResource
     */
    public function show($id)
    {
        $customer = $this->customerRepository->find($id);

        return new CustomerResource($customer);
    }

    /**
     * @param UpdateCustomerRequest $request
     * @param $id
     *
     * @throws ValidatorException
     *
     * @return CustomerResource
     */
    public function update(UpdateCustomerRequest $request, $id)
    {
        $input = $request->all();
        $customer = $this->customerRepository->update($input, $id);

        return new CustomerResource($customer);
    }

    /**
     * @param $id
     *
     * @return JsonResponse
     */
    public function destroy($id)
    {
        if (getSettingValue('default_customer') == $id) {

            return $this->SendError('Default customer can\'t be deleted');
        }
        $this->customerRepository->delete($id);

        return $this->sendSuccess('Customer deleted successfully');
    }
}
