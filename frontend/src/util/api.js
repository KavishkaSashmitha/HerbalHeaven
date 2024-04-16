export const fetchDirectCartData = async () => {
  try {
    const response = await fetch('http://localhost:8070/api/directcart');
    if (!response.ok) {
      throw new Error('Failed to fetch direct cart data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching direct cart data:', error);
    return [];
  }
};
