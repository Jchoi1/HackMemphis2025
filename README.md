# HackMemphis2025

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Jchoi1/HackMemphis2025.git
   cd HackMemphis2025
   ```

2. **Set up a Python virtual environment (optional but recommended)**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On macOS/Linux
   venv\Scripts\activate   # On Windows
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Starting the Server

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Run the server**:
   ```bash
   uvicorn main:app --reload
   ```

3. **Access the application**:
   Open your browser and navigate to `http://127.0.0.1:8000`.

## Notes
- Ensure you have Python 3.8 or higher installed.
- If you encounter any issues, check the console logs for error messages.
