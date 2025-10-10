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

export const getUser = async function (userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/get_user`, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId }),
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

export const getPreviewImages = async function (userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/get_previews`, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId }),
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

export const getFullImage = async function (userId, imageId) {
  try {
    const response = await fetch(`${API_BASE_URL}/get_full_image`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        image_id: imageId,
      }),
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
    console.error('Failed to fetch full image:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

export const uploadImage = async function (userId, category, imageBytes) {
  try {
    const response = await fetch(`${API_BASE_URL}/upload_image`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        category: category,
        imageBytes: imageBytes,
      }),
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
    console.error('Failed to upload file: ', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

export const deleteImage = async function (userId, imageId) {
  try {
    const response = await fetch(`${API_BASE_URL}/delete_image`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        image_id: imageId,
      }),
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
    console.error('Failed to delete image: ', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

export const generateImage = async function (userId, yourselfImageId, clothingImageId, style) {
  try {
    const response = await fetch(`${API_BASE_URL}/generate_image`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        yourself_image_id: yourselfImageId,
        clothing_image_id: clothingImageId,
        style: style,
      }),
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
    console.error('Failed to fetch full image:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}
