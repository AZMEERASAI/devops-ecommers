# ---------- Base Image ----------
FROM node:18-alpine

# ---------- Work Directory ----------
WORKDIR /app

# ---------- Copy Package Files ----------
COPY package*.json ./

# ---------- Install Dependencies ----------
RUN npm install --production

# ---------- Copy Source Code ----------
COPY . .

# ---------- Expose Backend Port ----------
EXPOSE 5000

# ---------- Start Command ----------
CMD ["npm", "start"]