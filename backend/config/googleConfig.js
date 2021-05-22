module.exports = {
  type: process.env.GOOGLE_type,
  project_id: process.env.GOOGLE_project_id,
  private_key_id: process.env.GOOGLE_PRIVATE_AUTH_ID,
  private_key: process.env.GOOGLE_PRIVATE_AUTH_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_client_email,
  client_id: process.env.GOOGLE_client_id,
  auth_uri: process.env.GOOGLE_auth_uri,
  token_uri: process.env.GOOGLE_token_uri,
  auth_provider_x509_cert_url: process.env.GOOGLE_auth_provider_cert_url,
  client_x509_cert_url: process.env.GOOGLE_client_cert_url,
};
