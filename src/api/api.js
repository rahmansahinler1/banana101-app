const API_BASE_URL = 'http://127.0.0.1:8000/api/v1'

export const healthCheck = async function () {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return {
      success: true,
      data: data,
    }
  } catch (error) {
    console.error('Health check failed:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}
