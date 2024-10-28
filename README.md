E-commerce Project
This is a full-stack e-commerce application designed to provide a seamless online shopping experience, featuring user authentication, product listings, shopping cart functionality, and payment processing.



# Start backend server

cd Sever
npm start

# Start frontend server

cd Client
npm npm run dev 


Folder Structure
ecommerce-project/
├── Server/
│   ├── src/
│   │   ├── adapters/
│   │   ├── entity/
│   │   ├── enums/
│   │   ├── errors/
│   │   ├── framework/
         --         
│   └── server.ts
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   └── index.tsx
└── README.md


Environment Variables
The project requires the following environment variables:

Backend .env file:

PORT=4002 
MONGO_URI="mongodb+srv://shahamsalam123:eWT5aeT5rlPZIwa6@cluster0.rabcj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET_key="MuhammedShaham"
CLOUDINARY_CLOUD_NAME=djbwtsuhu  
CLOUDINARY_API_KEY=463646489434671     
CLOUDINARY_API_SECRET=YjRHt9abliWMhCXSY9c1_iK09sM 





