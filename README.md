# NWAS Deploy

## ����

### ���� ����(LOCAL_SERVER)
1. ����
2. Unit test
3. Commit and Push to SRC_REPO

### ���� ����(DEV_SERVER)
1. Pull from SRC_REPO
2. E2E test
3. Upload to PROD_SERVER

### ���� ����(PROD_SERVER)
1. Commit to LOCAL_REPO
2. pm2-deploy
3. E2E test
