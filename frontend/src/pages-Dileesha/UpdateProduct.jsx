import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Input, Button, Typography } from '@material-tailwind/react';

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

  // Validation function for checking if a field is empty
  const validateField = (field) => {
    if (typeof field === 'string') {
      const isValid = field.trim() !== '';
      const message = isValid ? '' : 'Field cannot be empty';
      return { isValid, message };
    }
    return { isValid: false, message: 'Invalid field type' };
  };

  const validateNumberField = (field) => {
    const isValid = !isNaN(field);
    const message = isValid ? '' : 'Field must be a number';
    return { isValid, message };
  };
  const validateDate = (date) => {
    const isValid = !isNaN(new Date(date).getTime());
    const message = isValid ? '' : 'Invalid date';
    return { isValid, message };
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

  return (
    <div
      className="flex justify-center items-center h-100% pt-2 pb-2"
      style={{
        backgroundImage:
          'url("https://media.istockphoto.com/id/1192284372/photo/composition-of-natural-alternative-medicine-with-capsules-essence-and-plants.jpg?b=1&s=612x612&w=0&k=20&c=1ocZIu_aNqFvD-VZlJPTAlPNeZGK7afMYahtNKd9YdM=")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Card
        shadow={false}
        pt="1"
        pb="1"
        className="p-2  content-center"
        style={{ backgroundColor: '#D4EFDF', width: '40%' }}
      >
        <Typography variant="h4" color="blue-gray" className="text-center">
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
              {image && (
                <img
                  src={`http://localhost:8070/${image.replace(/\\/g, '/')}`}
                  alt="Product"
                  style={{ width: '100px', height: '80px' }}
                />
              )}
              <Input
                id="image"
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={(e) => setImage(e.target.files[0])}
                className="bg-white"
              />
            </div>
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
  );
};

export default UpdateProduct;
