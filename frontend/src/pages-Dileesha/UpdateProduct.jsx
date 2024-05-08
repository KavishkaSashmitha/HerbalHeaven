import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import Swal from 'sweetalert2';
import { Footer } from '../components/Footer';
import AdminNavbar from '../components/AdminNavbar';
import { DefaultSidebar } from '../components/Manager-Sidebar';

const UpdateProduct = () => {
  const { id } = useParams();
  const [productNo, setProductNo] = useState('');
  const [productName, setProductName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [category, setCategory] = useState('');
  const [cost, setCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reorderLevel, setReorderLevel] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [expiaryDate, setExpiaryDate] = useState('');
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileError, setFileError] = useState('');
  const [open, setOpen] = React.useState(0);

  // Validation function for checking if a field is empty
  const validateField = (field, fieldName) => {
    if (typeof field === 'string' && field.trim() !== '') {
      return true;
    } else {
      alert(`Please enter a valid ${fieldName}.`);
      return false;
    }
  };

  const validateNumberField = (field, fieldName) => {
    if (!isNaN(field)) {
      return true;
    } else {
      alert(`Please enter a valid ${fieldName}.`);
      return false;
    }
  };

  // Validation function for checking if a field is a valid date
  const validateDate = (date, fieldName) => {
    if (!isNaN(new Date(date).getTime())) {
      return true;
    } else {
      alert(`Please enter a valid ${fieldName}.`);
      return false;
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8070/inventory/getInventoryItem/${id}`)
      .then((result) => {
        const itemData = result.data;
        setProductNo(itemData.productNo);
        setProductName(itemData.productName);
        setShortDescription(itemData.shortDescription);
        setCategory(itemData.category);
        setCost(itemData.cost);
        setQuantity(itemData.quantity);
        setReorderLevel(itemData.reorderLevel);
        const formattedManufactureDate = new Date(itemData.manufactureDate)
          .toISOString()
          .split('T')[0];
        const formattedExpiaryDate = new Date(itemData.expiaryDate)
          .toISOString()
          .split('T')[0];

        setManufactureDate(formattedManufactureDate);
        setExpiaryDate(formattedExpiaryDate);

        setImage(itemData.image);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleImageChange = (e) => {
    setProductNo({ ...productNo, image: e.target.files[0] });
    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    setFileError('');
  };

  const Update = (e) => {
    e.preventDefault();

    console.log({
      productNo,
      productName,
      shortDescription,
      category,
      cost,
      quantity,
      reorderLevel,
      manufactureDate,
      expiaryDate,
      image,
    });

    const productNoValidation = validateNumberField(productNo);
    const productNameValidation = validateField(productName);
    const shortDescriptionValidation = validateField(shortDescription);
    const categoryValidation = validateField(category);
    const costValidation = validateNumberField(cost);
    const quantityValidation = validateNumberField(quantity);
    const reorderLevelValidation = validateNumberField(reorderLevel);
    const manufactureDateValidation = validateDate(manufactureDate);
    const expiaryDateValidation = validateDate(expiaryDate);
    if (
      productNoValidation.isValid &&
      productNameValidation.isValid &&
      shortDescriptionValidation.isValid &&
      categoryValidation.isValid &&
      costValidation.isValid &&
      quantityValidation.isValid &&
      reorderLevelValidation.isValid &&
      manufactureDateValidation.isValid &&
      expiaryDateValidation.isValid
    ) {
      axios
        .put(`http://localhost:8070/inventory/updateInventoryItem/${id}`, {
          productNo,
          productName,
          shortDescription,
          category,
          cost,
          quantity,
          reorderLevel,
          manufactureDate,
          expiaryDate,
          image,
        })
        .then((result) => {
          console.log(result);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Product updated successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/inventory');
        })
        .catch((err) => console.log(err));
    } else {
      // Combine all error messages into one array
      const errorMessages = [
        productNoValidation.message,
        productNameValidation.message,
        shortDescriptionValidation.message,
        categoryValidation.message,
        costValidation.message,
        quantityValidation.message,
        reorderLevelValidation.message,
        manufactureDateValidation.message,
        expiaryDateValidation.message,
      ];

      // Filter out empty error messages
      const filteredErrorMessages = errorMessages.filter(
        (message) => message !== ''
      );

      // Display error messages
      alert(filteredErrorMessages.join('\n'));
    }
  };

  /*const sendEmail = () => {
    // Here you can implement the logic to send an email
    console.log('Sending email...');
  }; */

  useEffect(() => {
    if (image && image instanceof Blob) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.onerror = () => {
        console.error('Error reading the file');
      };
      fileReader.readAsDataURL(image);

      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(image.type)) {
        setFileError('Please select a valid image file (JPEG, JPG, or PNG).');
      } else {
        setFileError('');
      }
    }
  }, [image]);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
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
              pt="1"
              pb="1"
              className="p-2  content-center"
              style={{ backgroundColor: '#D4EFDF', width: '40%' }}
            >
              <Typography
                variant="h4"
                color="blue-gray"
                className="text-center"
              >
                Update Product
              </Typography>
              <form
                className="mt-1 mb-1 ml-4 w-80 max-w-70-lg sm:w-96"
                onSubmit={Update}
              >
                <div className="grid grid-cols-2 gap-5 gap-x-20">
                  <div className="flex flex-col">
                    <Typography variant="h6" color="blue-gray">
                      Product No
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="productNo"
                      value={productNo}
                      onChange={(e) => setProductNo(e.target.value)}
                      readOnly
                      className="bg-white"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography variant="h6" color="blue-gray">
                      Product Name
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Enter Product Name"
                      onKeyPress={(event) => {
                        const regex = /^[a-zA-Z\s]+$/;
                        if (!regex.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography variant="h6" color="blue-gray">
                      Description
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Enter description"
                      onKeyPress={(event) => {
                        const regex = /^[a-zA-Z\s]+$/;
                        if (!regex.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography variant="h6" color="blue-gray">
                      Cost (Rs)
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Enter Cost"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      className="bg-white"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography variant="h6" color="blue-gray">
                      Quantity
                    </Typography>
                    <Input
                      size="lg"
                      type="tel"
                      placeholder="Enter Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      className="bg-white"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography variant="h6" color="blue-gray">
                      Reorder Level
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Enter Reorder Level"
                      value={reorderLevel}
                      onChange={(e) => setReorderLevel(e.target.value)}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      className="bg-white"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Typography variant="h6" color="blue-gray">
                      Manufacture Date
                    </Typography>
                    <Input
                      size="lg"
                      type="date"
                      placeholder="Enter Manufacture Date "
                      value={manufactureDate}
                      onChange={(e) => setManufactureDate(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography variant="h6" color="blue-gray">
                      Expiary Date
                    </Typography>
                    <Input
                      size="lg"
                      type="date"
                      placeholder="Enter Expiary Date"
                      value={expiaryDate}
                      onChange={(e) => setExpiaryDate(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Typography variant="h6" color="blue-gray">
                      Category
                    </Typography>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="category"
                          value="Beauty Product"
                          checked={category === 'Beauty Product'}
                          onChange={(e) => setCategory(e.target.value)}
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
                          checked={category === 'Immunity Product'}
                          onChange={(e) => setCategory(e.target.value)}
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
                          checked={category === 'Oils'}
                          onChange={(e) => setCategory(e.target.value)}
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
                          checked={category === 'Balms'}
                          onChange={(e) => setCategory(e.target.value)}
                        />
                        Balms
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <Typography variant="h6" color="blue-gray">
                      Image
                    </Typography>
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Product Preview"
                        style={{ width: '100px', height: '80px' }}
                      />
                    ) : (
                      image && (
                        <img
                          src={`${image}`}
                          alt="Product"
                          style={{ width: '100px', height: '80px' }}
                        />
                      )
                    )}
                    <Input
                      id="image"
                      type="file"
                      accept=".jpg,.png,.jpeg"
                      onChange={(e) => setImage(e.target.files[0])}
                      className="bg-white"
                    />
                  </div>
                  {fileError && (
                    <Typography className="text-danger">{fileError}</Typography>
                  )}
                </div>
                <Button
                  type="submit"
                  color="black"
                  ripple="light"
                  fullWidth
                  className="mt-1 ml-5"
                >
                  Update
                </Button>
              </form>
            </Card>{' '}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateProduct;
