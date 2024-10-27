

export default interface ICloudinaryService{
    uploadImage(image: string): Promise<string>
}   