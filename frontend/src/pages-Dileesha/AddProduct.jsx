import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { useForm } from './form-hook';

const AddProduct = () => {
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
        value: null,
        isValid: false,
      },
    },
    false
  );

  const Submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('productNo', formState.inputs.productNo.value); // Corrected
      formData.append('productName', formState.inputs.productName.value); // Corrected
      formData.append(
        'shortDescription',
        formState.inputs.shortDescription.value
      ); // Corrected
      formData.append('cost', formState.inputs.cost.value); // Corrected
      formData.append('quantity', formState.inputs.quantity.value); // Corrected
      formData.append('reorderLevel', formState.inputs.reorderLevel.value); // Corrected
      formData.append(
        'manufactureDate',
        formState.inputs.manufactureDate.value
      ); // Corrected
      formData.append('expiaryDate', formState.inputs.expiaryDate.value); // Corrected
      formData.append('image', formState.inputs.image.value); // Corrected

      const response = await axios.post(
        'http://localhost:8070/inventory/addInventoryItem',
        formData
      );
      console.log(response);
      console.log(formState.inputs);
      navigate('/inventory');
    } catch (err) {
      console.log(err);
    }
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

  /*
    // Define error messages for each validation
    const errorMessages = {
      productNo: 'Please enter a product number.',
      productName: 'Please enter a product name.',
      shortDescription: 'Please enter a short description.',
      cost: 'Please enter a valid cost.',
      quantity: 'Please enter a valid quantity greater than zero.',
      reorderLevel: 'Reorder level cannot be lower than quantity.',
      manufactureDate: 'Please enter a valid manufacture date.',
      expiaryDate: 'Please enter a valid expiry date.',
      image: 'Please upload an image.',
    };

    // Validation function for checking if a field is empty
    const validateField = (field, fieldName) => {
      if (field.trim() === '') {
        alert(errorMessages[fieldName]);
        return false;
      }
      return true;
    };

    // Validation function for checking if a number field is numeric
    const validateNumberField = (field, fieldName) => {
      if (isNaN(field)) {
        alert(errorMessages[fieldName]);
        return false;
      }
      return true;
    };

    // Validation function for checking if a date field is a valid date
    const validateDate = (date, fieldName) => {
      if (isNaN(new Date(date).getTime())) {
        alert(errorMessages[fieldName]);
        return false;
      }
      return true;
    };

    // Validate form fields
    if (
      validateField(productNo) &&
      validateField(productName) &&
      validateField(shortDescription) &&
      validateField(cost) &&
      validateNumberField(quantity) &&
      validateNumberField(reorderLevel) &&
      validateDate(manufactureDate) &&
      validateDate(expiaryDate) &&
      image !== ''
    ) {
      if (parseInt(quantity) <= 0) {
        alert('Please enter a valid quantity greater than zero.');
        return;
      }
      if (parseInt(reorderLevel) > parseInt(quantity)) {
        alert('Reorder level cannot be lower than quantity.');
        return;
      }

      axios
        .post('http://localhost:8070/inventory/addInventoryItem', {
          productNo,
          productName,
          shortDescription,
          cost,
          quantity,
          reorderLevel,
          manufactureDate,
          expiaryDate,
          image,
        })
        .then((result) => {
          console.log(result);
          navigate('/inventory');
        })
        .catch((err) => console.log(err));
    }
  };
*/
  return (
    <div
      className="flex justify-center items-center h-100 pt-2 pb-2"
      style={{
        backgroundImage:
          'url("https://cache.desktopnexus.com/thumbseg/2447/2447104-bigthumbnail.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Card
        shadow={false}
        pt="5"
        className="p-4"
        style={{ backgroundColor: '#D4EFDF', width: '40%' }}
      >
        <Typography variant="h4" color="blue-gray" className="text-center">
          Add New Product
        </Typography>
        <form
          enctype="multipart/form-data"
          className="mt-8 mb-2 ml-4 w-80 max-w-70-lg sm:w-96"
          onSubmit={Submit}
        >
          <div className="grid grid-cols-2 gap-5 gap-x-20">
            <div className="flex flex-col w-full">
              <Typography variant="h6" color="blue-gray" className="-mb-1">
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
              <Typography variant="h6" color="blue-gray" className="-mb-1">
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
                required
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white "
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            <div className="flex flex-col">
              <Typography variant="h6" color="blue-gray" className="-mb-1">
                Description
              </Typography>
              <Input
                size="lg"
                id="shortDescription"
                type="text"
                placeholder="Enter description"
                onInput={(event) =>
                  inputHandler('shortDescription', event.target.value, true)
                }
                required
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white "
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            <div className="flex flex-col">
              <Typography variant="h6" color="blue-gray" className="-mb-1">
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
              <Typography variant="h6" color="blue-gray" className="-mb-1">
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
              <Typography variant="h6" color="blue-gray" className="-mb-1">
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
              <Typography variant="h6" color="blue-gray" className="-mb-1">
                Manufacture Date
              </Typography>
              <Input
                size="lg"
                type="date"
                placeholder="Enter Manufacture Date"
                id="manufactureDate"
                onInput={(event) =>
                  inputHandler('manufactureDate', event.target.value, true)
                }
                required
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white "
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            <div className="flex flex-col">
              <Typography variant="h6" color="blue-gray" className="-mb-1">
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
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white "
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              {fileError && (
                <Typography className="text-danger">{fileError}</Typography>
              )}
            </div>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Product"
                style={{ marginTop: '3%', width: '70%', height: '70%' }}
              />
            )}
          </div>
          <Button
            type="submit"
            className="mt-6 ml-5"
            fullWidth
            disabled={!formState.isValid}
          >
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
