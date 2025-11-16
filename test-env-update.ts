import { EbaySellerApi } from './src/api/index.js';
import { getEbayConfig } from './src/config/environment.js';
import { readFileSync } from 'fs';

async function testEnvUpdate() {
  console.log('🧪 Testing .env Update Functionality\n');

  console.log('📋 Current .env file (EBAY_USER_ACCESS_TOKEN):');
  const envBefore = readFileSync('.env', 'utf-8');
  const accessTokenBefore = envBefore.match(/^EBAY_USER_ACCESS_TOKEN=(.*)$/m);
  console.log('   Before:', accessTokenBefore ? accessTokenBefore[1] : '(not set)');
  console.log();

  const api = new EbaySellerApi(getEbayConfig());

  console.log('🔧 Calling setUserTokens with test tokens...');
  const testAccessToken = 'test_access_token_' + Date.now();
  const testRefreshToken = 'test_refresh_token_' + Date.now();

  await api.setUserTokens(testAccessToken, testRefreshToken);
  console.log();

  console.log('📋 Updated .env file:');
  const envAfter = readFileSync('.env', 'utf-8');
  const accessTokenAfter = envAfter.match(/^EBAY_USER_ACCESS_TOKEN=(.*)$/m);
  const refreshTokenAfter = envAfter.match(/^EBAY_USER_REFRESH_TOKEN=(.*)$/m);

  console.log('   EBAY_USER_ACCESS_TOKEN:', accessTokenAfter ? accessTokenAfter[1].substring(0, 40) + '...' : '(not set)');
  console.log('   EBAY_USER_REFRESH_TOKEN:', refreshTokenAfter ? refreshTokenAfter[1].substring(0, 40) + '...' : '(not set)');
  console.log();

  if (accessTokenAfter && accessTokenAfter[1] === testAccessToken) {
    console.log('✅ SUCCESS! .env file was updated with new access token');
  } else {
    console.log('❌ FAILED! .env file was not updated correctly');
  }

  if (refreshTokenAfter && refreshTokenAfter[1] === testRefreshToken) {
    console.log('✅ SUCCESS! .env file was updated with new refresh token');
  } else {
    console.log('❌ FAILED! .env file was not updated correctly');
  }

  console.log();
  console.log('💡 Note: When you call refreshUserToken() with a valid refresh token,');
  console.log('   the .env file will automatically be updated with the new access token!');
}

testEnvUpdate().catch(console.error);
