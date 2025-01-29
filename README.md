# Happy Estates - Real Estate Management System

A comprehensive real estate management system built with React.js and Spring Boot, designed to streamline property management operations.

## System Requirements

### Frontend Requirements
- Node.js v20.17.0
- npm v10.8.2

### Backend Requirements
- Java OpenJDK 21.0.4 LTS (Eclipse Adoptium)
- Apache Maven 3.9.9 

## Project Structure

```
Happy-Estates/
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   ├── package.json
│   └── README.md
└── artf/                    # Spring Boot backend application
    ├── src/
    │   └── main/
    │       ├── java/
    │       │   └── com/
    │       │       └── prjgrp/
    │       │           └── artf/
    │       │               ├── controller/
    │       │               ├── model/
    │       │               ├── repository/
    │       │               ├── service/
    │       │               └── ArtfApplication.java
    │       └── resources/
    │           └── application.properties
    ├── pom.xml
    └── README.md
```

## Installation & Setup

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/SharveshGuru/Happy-Estates.git
cd Happy-Estates
```

2. Database Setup
- Install MySQL
- Create a new database named 'appdb'

3. Running the Backend

Method 1: Using Java directly
```bash
cd "C:\stuff\real estate\Happy-Estates\artf\src\main\java"
javac com/prjgrp/artf/ArtfApplication.java
java com.prjgrp.artf.ArtfApplication
```

Method 2: Using IDE
1. Open your Java IDE (Eclipse, IntelliJ IDEA, VS Code)
2. Navigate to `artf\src\main\java\com\prjgrp\artf\ArtfApplication.java`
3. Right-click on `ArtfApplication.java`
4. Select "Run As" → "Java Application"

Method 3: Using Maven
```bash
cd artf
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory
```bash
cd reactapp
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The frontend application will be available on `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes 
4. Push to the branch 
5. Open a Pull Request

## Troubleshooting

### Common Backend Issues
1. Port 8080 already in use:
   - Change port in application.properties
   - Or kill the process using the port

### Common Frontend Issues
1. Node modules issues:
   ```bash
   rm -rf node_modules
   npm clean-cache --force
   npm install
   ```
