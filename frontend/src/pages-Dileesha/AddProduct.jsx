import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { useForm } from './form-hook';
import Swal from 'sweetalert2';

import { Footer } from '../components/Footer';
import AdminNavbar from '../components/AdminNavbar';
import { DefaultSidebar } from '../components/Manager-Sidebar';

const AddProduct = () => {
  const [open, setOpen] = React.useState(0);

  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileError, setFileError] = useState('');
  const [formState, inputHandler] = useForm(
    {
      productNo: {
        value: '',
        isValid: false,
      },
      productName: {
        value: '',
        isValid: false,
      },
      shortDescription: {
        value: '',
        isValid: false,
      },
      category: {
        value: '',
        isValid: false,
      },
      cost: {
        value: '',
        isValid: false,
      },
      quantity: {
        value: '',
        isValid: false,
      },

      reorderLevel: {
        value: '',
        isValid: false,
      },
      manufactureDate: {
        value: '',
        isValid: false,
      },
      expiaryDate: {
        value: '',
        isValid: false,
      },
      image: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const Submit = async (event) => {
    event.preventDefault();

    const validateManufactureExpiryDates = (manufactureDate, expiryDate) => {
      const manufactureTimestamp = new Date(manufactureDate).getTime();
      const expiryTimestamp = new Date(expiryDate).getTime();

      if (manufactureTimestamp >= expiryTimestamp) {
        alert('Manufacture date must be before expiry date.');
        return false;
      }

      return true;
    };

    const validateField = (field, fieldName) => {
      if (field.trim() === '') {
        alert(`Please enter a valid ${fieldName}.`);
        return false;
      }
      return true;
    };

    const validateNumberField = (field, fieldName) => {
      if (isNaN(field)) {
        alert(`Please enter a valid ${fieldName}.`);
        return false;
      }
      return true;
    };

    const validateDate = (date, fieldName) => {
      if (isNaN(new Date(date).getTime())) {
        alert(`Please enter a valid ${fieldName}.`);
        return false;
      }
      return true;
    };

    const {
      productNo,
      productName,
      shortDescription,
      category,
      cost,
      quantity,
      reorderLevel,
      manufactureDate,
      expiaryDate,
    } = formState.inputs;

    if (!validateNumberField(productNo.value, 'product number')) return;
    if (!validateField(productName.value, 'product name')) return;
    if (!validateField(shortDescription.value, 'short description')) return;
    if (!validateField(category.value, 'category')) return;
    if (!validateNumberField(cost.value, 'cost')) return;
    if (!validateNumberField(quantity.value, 'quantity')) return;
    if (!validateNumberField(reorderLevel.value, 'reorder level')) return;
    if (!validateDate(manufactureDate.value, 'manufacture date')) return;
    if (!validateDate(expiaryDate.value, 'expiry date')) return;
    if (
      !validateManufactureExpiryDates(manufactureDate.value, expiaryDate.value)
    )
      return;

    if (parseInt(quantity.value) <= 0) {
      alert('Please enter a valid quantity greater than zero.');
      return;
    }
    if (parseInt(reorderLevel.value) > parseInt(quantity.value)) {
      alert('Reorder level cannot be lower than quantity.');
      return;
    }

    const upimg = new FormData();

    upimg.append('image', formState.inputs.image.value);

    axios
      .post('http://localhost:8070/inventory/uploadimg', upimg)
      .then((res) => {
        const url = res.data.downloadURL;
        console.log(url);
        try {
          const formData = {
            productNo: formState.inputs.productNo.value,
            productName: formState.inputs.productName.value,
            shortDescription: formState.inputs.shortDescription.value,
            category: formState.inputs.category.value,
            cost: formState.inputs.cost.value,
            quantity: formState.inputs.quantity.value,
            reorderLevel: formState.inputs.reorderLevel.value,
            manufactureDate: formState.inputs.manufactureDate.value,
            expiaryDate: formState.inputs.expiaryDate.value,
            image: url,
          };
          const response = axios.post(
            'http://localhost:8070/inventory/addInventoryItem',
            formData
          );
          console.log(response);
          console.log(formState.inputs);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Product added successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/inventory');
        } catch (err) {
          console.log(err);
        }
      });
  };

  useEffect(() => {
    if (formState.inputs.image.value instanceof Blob) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.onerror = () => {
        console.error('Error reading the file');
      };
      fileReader.readAsDataURL(formState.inputs.image.value);

      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(formState.inputs.image.value.type)) {
        setFileError('Please select a valid image file (JPEG, JPG, or PNG).');
      } else {
        setFileError('');
      }
    }
  }, [formState.inputs.image.value]);

  return (
    // <div
    //   className="flex justify-center items-center h-100 pt-2 pb-2"
    //   style={{
    //     backgroundImage:
    //       'url("https://cache.desktopnexus.com/thumbseg/2447/2447104-bigthumbnail.jpg")',
    //     backgroundRepeat: 'no-repeat',
    //     backgroundSize: 'cover',
    //   }}
    // >
    <div
      className="flex flex-col min-h-screen overflow-hidden overflow-x-hidden"
      style={{ backgroundColor: '#02353c' }}
    >
      <div className="flex flex-1 overflow-scroll">
        <div
          className={`sidebar w-68 bg-custom-color text-white ${
            open ? 'block' : 'hidden'
          }`}
        >
          <DefaultSidebar open={open} handleOpen={setOpen} />
        </div>
        <div className="w-full h-full">
          <AdminNavbar toggleSidebar={toggleSidebar} />
          <div className="w-full h-full flex justify-center items-center bg-blue-gray-100">
            <Card
              shadow={false}
              pt="3"
              className="p-3 align-middle"
              style={{
                backgroundColor: '#D4EFDF',
                width: '40% ',
                height: '500px',
                marginRight: '20px',
              }}
            >
              <Typography
                variant="h4"
                color="blue-gray"
                className="text-center mt-10"
              >
                Upload Product Photo
              </Typography>
              <form
                enctype="multipart/form-data"
                className="mt-8 mb-2 ml-3 w-80 max-w-70-lg sm:w-96"
                onSubmit={Submit}
              >
                <div className="flex flex-col">
                  <Typography variant="h6" color="blue-gray" className="-mb-1">
                    Image
                  </Typography>
                  <Input
                    id="image"
                    type="file"
                    accept=".jpg,.png,.jpeg"
                    placeholder="Add image"
                    onInput={(event) =>
                      inputHandler('image', event.target.files[0], true)
                    }
                    required
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 bg-white mt-1 "
                    labelProps={{
                      className: 'before:content-none after:content-none',
                    }}
                  />
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Product Preview"
                      style={{
                        marginLeft: '1rem',
                        marginTop: '1rem',
                        width: '200px',
                        height: '200px',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        marginLeft: '7rem',
                        marginTop: '1rem',
                        width: '200px',
                        height: '200px',
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography color="gray">No Image</Typography>
                    </div>
                  )}
                </div>
                {fileError && (
                  <Typography className="text-danger">{fileError}</Typography>
                )}
              </form>
            </Card>
            <Card
              shadow={false}
              pt="3"
              className="p-3 align-middle "
              style={{ backgroundColor: '#D4EFDF', width: '40%' }}
            >
              <Typography
                variant="h4"
                color="blue-gray"
                className="text-center"
              >
                Add Product Details
              </Typography>
              <form
                enctype="multipart/form-data"
                className="mt-8 mb-2 ml-3 w-80 max-w-70-lg sm:w-96"
                onSubmit={Submit}
              >
                <div className="grid grid-cols-2 gap-5 gap-x-20 ml-2">
                  <div className="flex flex-col w-full ">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-1"
                    >
                      Product No
                    </Typography>
                    <Input
                      size="lg"
                      id="productNo"
                      type="number"
                      placeholder="Enter product number"
                      onInput={(event) =>
                        inputHandler('productNo', event.target.value, true)
                      }
                      required
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white "
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-1"
                    >
                      Product Name
                    </Typography>
                    <Input
                      size="lg"
                      id="productName"
                      type="text"
                      placeholder="Enter product name"
                      onInput={(event) =>
                        inputHandler('productName', event.target.value, true)
                      }
                      onKeyPress={(event) => {
                        const regex = /^[a-zA-Z\s]+$/;
                        if (!regex.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      required
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white "
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                  </div>

                  <div className="flex flex-col">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-1"
                    >
                      Description
                    </Typography>
                    <Input
                      size="lg"
                      id="shortDescription"
                      type="text"
                      placeholder="Enter description"
                      onInput={(event) =>
                        inputHandler(
                          'shortDescription',
                          event.target.value,
                          true
                        )
                      }
                      onKeyPress={(event) => {
                        const regex = /^[a-zA-Z\s]+$/;
                        if (!regex.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      required
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white "
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                    {formState.inputs.shortDescription.value.length > 25 && (
                      <Typography className="text-danger">
                        Description cannot exceed 25 characters.
                      </Typography>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-1"
                    >
                      Cost (Rs)
                    </Typography>
                    <Input
                      size="lg"
                      id="cost"
                      type="number"
                      placeholder="Enter unit price"
                      min="1"
                      onInput={(event) =>
                        inputHandler('cost', event.target.value, true)
                      }
                      required
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white "
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                  </div>

                  <div className="flex flex-col">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-1"
                    >
                      Quantity
                    </Typography>
                    <Input
                      size="lg"
                      id="quantity"
                      type="number"
                      placeholder="Enter quantity"
                      min="1"
                      onInput={(event) =>
                        inputHandler('quantity', event.target.value, true)
                      }
                      required
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white "
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-1"
                    >
                      Reorder Level
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Enter Reorder Level"
                      id="reorderLevel"
                      type="number"
                      min="1"
                      onInput={(event) =>
                        inputHandler('reorderLevel', event.target.value, true)
                      }
                      required
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white "
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-1"
                    >
                      Manufacture Date
                    </Typography>
                    <Input
                      size="lg"
                      type="date"
                      placeholder="Enter Manufacture Date"
                      id="manufactureDate"
                      onInput={(event) =>
                        inputHandler(
                          'manufactureDate',
                          event.target.value,
                          true
                        )
                      }
                      required
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white "
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-1"
                    >
                      Expiary Date
                    </Typography>
                    <Input
                      size="lg"
                      type="date"
                      placeholder="Enter Expiary Date"
                      id="expiaryDate"
                      onInput={(event) =>
                        inputHandler('expiaryDate', event.target.value, true)
                      }
                      required
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white "
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-1"
                    >
                      Category
                    </Typography>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="category"
                          value="Beauty Product"
                          checked={
                            formState.inputs.category.value === 'Beauty Product'
                          }
                          onChange={(event) =>
                            inputHandler('category', event.target.value, true)
                          }
                        />
                        Beauty Product
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="category"
                          value="Immunity Product"
                          checked={
                            formState.inputs.category.value ===
                            'Immunity Product'
                          }
                          onChange={(event) =>
                            inputHandler('category', event.target.value, true)
                          }
                        />
                        Immunity Product
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="category"
                          value="Oils"
                          checked={formState.inputs.category.value === 'Oils'}
                          onChange={(event) =>
                            inputHandler('category', event.target.value, true)
                          }
                        />
                        Oils
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="category"
                          value="Balms"
                          checked={formState.inputs.category.value === 'Balms'}
                          onChange={(event) =>
                            inputHandler('category', event.target.value, true)
                          }
                        />
                        Balms
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="mt-12 ml-1 h-10"
                    fullWidth
                    height="20%"
                    disabled={!formState.isValid}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;
