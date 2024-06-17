# Gunakan image Node.js resmi sebagai base image
FROM node:18-slim

# Tentukan direktori kerja dalam container
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Instal dependensi aplikasi
RUN npm install

# Install cloud-sql-proxy
RUN curl -o cloud-sql-proxy https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 && chmod +x cloud-sql-proxy

# Salin seluruh kode aplikasi ke dalam container
COPY . .

# Set environment variable PORT untuk Cloud Run
ENV PORT=8080

# Expose port aplikasi
EXPOSE 8080

# Jalankan aplikasi saat container mulai
CMD ["npx", "concurrently", "./cloud-sql-proxy --port 3306 xportnusa-425004:us-central1:xport", "npm start"]
