// firebase/admin.ts
import * as admin from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: "preppro-31ace",
  private_key_id: "42b91a6b96e691484fbab560c74d6b28492c5d2a",
  private_key: `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCSw2FOetYW22OV
L5v+nM3JmLXkzScBRHU6U/er1USyOSZyTxzjmBUc3LYgioztye7M4ppV1RsrMbGg
5F5Fq3NBjMDH5L5jO3E+KJe4Tm8ITCHR+rDF5IkPhNKo4vFiI9HPNQCVpxDxd5J5
pTEpVqFcO270LGDQqBgXhJ8ogJzrFWSkx88YV2otvf+90iyo8Iyk6kSKfZ4k2ReR
+VSM+htQS+z3wyIbx/VJccB2A1xcikuc3od35d5K7gen0zMUpD7bubc1l95+ZMI1
1knt/fFcVhZtisuvPdqVCAra5T761et4smx74QTRwK+TbMS0FiuJ1GGkmqMQvztd
a96exL23AgMBAAECggEAKZsP8+Ko3LP3SCzGCWlEgZk0P5fVLevNW+q/9Mux/OBs
wM0iwHa1zYfYbeM5TpQHibfXzutqF1WwKI91FkUjmHqhkEmNm64XTWrOkCZUHcMP
d2qdQIyoOmkKG2yyx4KmERrSfpptGDcwpCGrjS+M8Qu8SaZnD+AHbGthf2bulUn+
LTtyjfyKQNa6cE3vHC35OfAwBN6oartwu1VHdQW7bGtoEyp+299T7Fgbvz8P08iQ
x3809KEA9TbBjWFY92Qz+VU2kHyjRa7jrms99Xto6OLQCPntfnPCM3fm9JRfWqOi
p8K90xkxXlLBYIYUuENd7HtAqMMPevrcnC5DaZx3UQKBgQDOmunQGH4YF23ECBkZ
3aAJOdc+tQ0rpZbBjorNfxKECXrny4l8xsBJYcCDOmYkVuvV/5KGjBXDz2hPGMYK
Jws6HfkyBjG8nLZNA73kqC39QaklM0u81xqjb5rS/OhgymE1bz6X9jMY0Eefe+D3
r2p6Qp2sNvCD/1IMKUPLnM5K/wKBgQC12eTVWnHLtYs0GnhHYxbJnBSbo2J1Jq0I
vnCuEoEVM2d65ILsFQ0vmG9jWr5XsC8MaTLdTgCqlIyH7ksQazt3xlHq62yjrODN
HX8q/cjPhFKtWucuzmt9tI+6kW1Yx+aoyjOOjfzljNF1kgj6zRXCuXd7WYYEXSMr
VMz8pWWlSQKBgD3ROi5KdcgNkok6BxCnMFAyX0Xi9DrgA9iMJtnPsKGTGJQsYUnV
Sglq1ygsnA05eL0CCDx7w7Nf5ozsE61L+177QumF0vHlTeKDQRkefQwuzkZUL9Aj
6FOIfCGvDHSReT58t5TOVIGTKCr+7NQPR2OndPfnRFWqWklLO367vznPAoGACKse
UV1CV2eL/yvT1/NNPscF5HVhWBxD20rYrDONm6kboawK4Z4PRtmJVb8Zm6x2Ua0i
E5KITZlPKZueUGYMK6V0ejJGt3aiMKTbTv1R+TJhjonqwzxru05EG6ya/cRpplod
Iwp5p6eSxHv1mZ71DpcwrtyRmtultYcRTmnD8qECgYAYCR8l4Eegjd1zmYSe/gDa
1AmOTqQZTaK9gHpHEACPfqZFjtUnAliMq+rY208TL8O89z5EkSVoGqYLGP6PK1Pz
DK6vhS6oMsc0zK3mkoJu7aRMdVCfuIxw9rF//pOLYFOwp7uutB60hMKT5Tjt5Yxw
YE8y7rHkIrVSuCSMIExL3Q==
-----END PRIVATE KEY-----`,
  client_email:
    "firebase-adminsdk-fbsvc@preppro-31ace.iam.gserviceaccount.com",
  client_id: "115123511678619952784",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40preppro-31ace.iam.gserviceaccount.com",
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

// ✅ Get Firestore instance
const db = admin.firestore();

export { admin, db };
export default db;
