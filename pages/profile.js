import { useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { PenFill } from 'react-bootstrap-icons'
import Image from 'next/image'
import style from '../styles/Profile.module.css'

const Profile = () => {
  const [userImage, setUserImage] = useState('')
  const [imageSource, setImageSource] = useState('')
  const [error, setError] = useState('')
  const user = {
    userImage: 'https://picsum.photos/id/123/100'
  }

  const previewImage = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImageSource(reader.result)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (userImage) {
      console.log(userImage)
    }
  }

  const handleChange = (e) => {
    const ONE_MEGA_BYTE = 1024 * 1024
    const selectedFile = e?.target?.files[0]
    const allowedFileType = ['image/jpeg', 'image/jpg', 'image/png']


    if (!selectedFile) return setImageSource('')
    const isValidImageType = allowedFileType.indexOf(selectedFile?.type) !== -1
    const isValidImageSize = selectedFile?.size <= ONE_MEGA_BYTE
    const isNotValidInput = !isValidImageType || !isValidImageSize

    if (isNotValidInput) {
      setUserImage('')
      setImageSource('')
      setError('Please insert a valid image format and size')
      return    
    }

    setError('')
    setUserImage(selectedFile)
    previewImage(selectedFile)
  }
  return (
    <>
      <Container>
        <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <Form onSubmit={handleSubmit} className="text-center">
              <Form.Group controlId="form.file" className="mb-3">
                <div className={style.userImage}>
                  <Image src={imageSource ? imageSource : user.userImage} alt="avatar" width={100} height={100} />
                  <Form.Label className={style.editIcon}> <PenFill size={10} color={'gray'} /> </Form.Label>
                </div>
                <Form.Control className="d-none" type="file" name="userImage" onChange={handleChange} />
              </Form.Group>
              <Button type="submit">Upload</Button>
            </Form>

            {error && (
              <Alert variant="danger" onClose={() => setError('')} dismissible>
                {error}
              </Alert>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}

export default Profile
