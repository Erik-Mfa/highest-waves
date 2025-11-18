# Highest Waves - Beat Sales Platform

A full-stack web application for selling and managing beats, built with React, Node.js, and MongoDB.

## 🚀 Quick Start

1. Clone the repository
```bash
git clone https://github.com/Erik-Mfa/highest-waves.git
cd highest-waves
```

2. Set up environment variables (see [Environment Setup](#environment-setup))
3. Start with Docker Compose
```bash
docker-compose up -d
```

## 🏗️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Payment**: Stripe
- **Deployment**: Docker, Nginx, AWS EC2
- **SSL**: Let's Encrypt

## 📁 Project Structure

```
highest-waves/
├── frontend/          # React frontend application
├── backend/           # Node.js backend API
└── docker-compose.yml # Docker composition
```

## 🔧 Environment Setup

### Required Environment Variables

Create two .env files:

1. Root directory `.env`:
```env
NODE_ENV=production
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
EMAIL_USER=your_email_service_user
EMAIL_PASS=your_email_service_password
FRONTEND_URL=https://highestwaves.com
```

2. Frontend directory `.env`:
```env
REACT_APP_BACKEND_URL=/api
```

⚠️ **Security Notes**:
- Never commit .env files to Git
- Use strong, unique secrets for JWT and other keys
- Store production credentials securely
- Regularly rotate secrets and API keys

## Complete Deployment Guide

### 1. Initial EC2 Setup

```bash
# Connect to your EC2 instance
ssh -i /path/to/your-key.pem ec2-user@your-ec2-ip

# Update system
sudo yum update -y

# Install required software
sudo yum install git docker nginx -y

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 2. SSL Certificate Setup

```bash
# Install Certbot
sudo yum install certbot python3-certbot-nginx -y

# Get SSL Certificate
sudo certbot --nginx -d highestwaves.com -d www.highestwaves.com
```

### 3. Nginx Configuration

Create and edit Nginx configuration:
```bash
sudo nano /etc/nginx/conf.d/highestwaves.conf
```

Add this configuration:
```nginx
server {
    server_name highestwaves.com www.highestwaves.com;

    # Static assets - must come first
    location /api/assets/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 20M;
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
    }

    # API routes
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 20M;
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
    }

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl; # managed by Certbot
    # SSL configuration will be added by Certbot
}
```

Test and restart Nginx:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

### 4. Application Deployment

```bash
# Clone repository
git clone https://github.com/yourusername/highest-waves.git
cd highest-waves

# Set up environment files (IMPORTANT: Add your actual values)
cp .env.example .env
cp frontend/.env.example frontend/.env

# Start the application
docker-compose pull
docker-compose up -d

# Verify deployment
docker-compose ps
docker-compose logs -f
```

## 🔄 Maintenance and Updates

### Common Commands

```bash
# View container status
docker-compose ps

# View logs
docker-compose logs -f

# Update application
git pull
docker-compose up --build -d

# Restart services
docker-compose restart

# Stop all services
docker-compose down
```

### Backup Important Data

```bash
# Backup assets volume
docker run --rm -v beats-assets:/source -v $(pwd):/backup alpine tar czf /backup/beats-assets-backup.tar.gz -C /source .

# Backup MongoDB (adjust URI)
mongodump --uri="your_mongodb_uri" --out=./backup
```

## 🔒 Security Checklist

✅ Environment Setup:
- [ ] All sensitive values replaced in .env files
- [ ] Strong, unique passwords/keys used
- [ ] Production MongoDB URI uses SSL
- [ ] Stripe webhook secret configured
- [ ] Email service credentials secured

✅ Server Setup:
- [ ] EC2 security groups properly configured
- [ ] SSH key properly secured
- [ ] Regular system updates enabled
- [ ] SSL certificates installed and auto-renewal configured

✅ Application Security:
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] File upload restrictions in place
- [ ] Regular security updates for dependencies

## 🐛 Troubleshooting

### Common Issues

1. **502 Bad Gateway**
   - Check if containers are running: `docker-compose ps`
   - View backend logs: `docker-compose logs backend`
   - Verify Nginx config: `sudo nginx -t`

2. **Static Files Not Loading**
   - Check volume mounts
   - Verify file permissions
   - Check Nginx asset configuration

3. **SSL Certificate Issues**
   - Check certificate status: `sudo certbot certificates`
   - Verify Nginx SSL config
   - Check certificate renewal: `sudo certbot renew --dry-run`

### Debug Commands

```bash
# Check all container logs
docker-compose logs -f

# Check specific container logs
docker-compose logs -f backend

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Check SSL certificates
sudo certbot certificates

# Check Docker volumes
docker volume ls
docker volume inspect beats-assets
```
