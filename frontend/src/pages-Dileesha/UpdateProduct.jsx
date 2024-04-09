import 'tailwindcss/tailwind.css';
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
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);

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
        setImage(itemData.image);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const Update = async (e) => {
    e.preventDefault();

    const productNoValidation = validateNumberField(productNo);
    const productNameValidation = validateField(productName);
    const shortDescriptionValidation = validateField(shortDescription);
    const categoryValidation = validateField(category);
    const costValidation = validateNumberField(cost);
    const quantityValidation = validateNumberField(quantity);
    const reorderLevelValidation = validateNumberField(reorderLevel);

    const validations = [
      productNoValidation,
      productNameValidation,
      shortDescriptionValidation,
      categoryValidation,
      costValidation,
      quantityValidation,
      reorderLevelValidation,
    ];

    const isValid = validations.every((validation) => validation.isValid);

    if (!isValid) {
      const errorMessages = validations
        .filter((validation) => !validation.isValid)
        .map((validation) => validation.message);
      setErrors(errorMessages);
      return;
    }

    const formData = new FormData();
    formData.append('productNo', productNo);
    formData.append('productName', productName);
    formData.append('shortDescription', shortDescription);
    formData.append('category', category);
    formData.append('cost', cost);
    formData.append('quantity', quantity);
    formData.append('reorderLevel', reorderLevel);
    formData.append('image', image);

    try {
      const result = await axios.put(
        `http://localhost:8070/inventory/updateInventoryItem/${id}`,
        formData
      );
      console.log(result);
      navigate('/inventory');
    } catch (error) {
      console.error(error);
    }
  };

  /*const sendEmail = () => {
    // Here you can implement the logic to send an email
    console.log('Sending email...');
  }; */

  return (
    <div
      className="flex justify-center items-center h-100% pt-11 pb-11"
      style={{
        backgroundImage:
          'url("https://media.istockphoto.com/id/1192284372/photo/composition-of-natural-alternative-medicine-with-capsules-essence-and-plants.jpg?b=1&s=612x612&w=0&k=20&c=1ocZIu_aNqFvD-VZlJPTAlPNeZGK7afMYahtNKd9YdM=")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Card
        shadow={false}
        pt="5"
        pb="1"
        className="p-5 mt-12 mb-12 content-center"
        style={{ backgroundColor: '#D4EFDF', width: '40%' }}
      >
        <Typography variant="h4" color="blue-gray" className="text-center">
          Update Product
        </Typography>
        <form
          className="mt-8 mb-2 ml-4 w-80 max-w-70-lg sm:w-96"
          onSubmit={Update}
        >
          <div className="grid grid-cols-2 gap-3 gap-x-20">
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
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                readOnly
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
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
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
                    onChange={() => setCategory('Beauty Product')}
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
                    onChange={() => setCategory('Immunity Product')}
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
                    onChange={() => setCategory('Oils')}
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
                    onChange={() => setCategory('Balms')}
                  />
                  Balms
                </label>
              </div>
            </div>
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
              Image
            </Typography>
            {image && (
              <img
                src={`data:image/jpeg;base64,${image}`}
                style={{ maxWidth: '200px', marginBottom: '10px' }}
                alt=""
              />
            )}
            <Input
              size="lg"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="bg-white"
            />
          </div>

          <Button
            type="submit"
            color="black"
            ripple="light"
            fullWidth
            className="mt-6 ml-5"
          >
            Update
          </Button>
        </form>
      </Card>{' '}
    </div>
  );
};

export default UpdateProduct;
