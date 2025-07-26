export const getData = (req, res) => {
  try {
    const responseData = {
      status: "success",
      message: "Data retrieved successfully",
      data: {
        users: [
          { id: 1, name: "John Doe", email: "john@example.com" },
          { id: 2, name: "Jane Smith", email: "jane@example.com" }
        ],
        total: 2,
        page: 1
      },
      timestamp: new Date().toISOString()
    };
    
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ 
      status: "error",
      message: "Internal server error",
      error: error.message 
    });
  }
};