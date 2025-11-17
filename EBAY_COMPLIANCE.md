# eBay Developer Program Compliance

This document outlines how the ebay-mcp project complies with eBay's developer policies and open source best practices.

## Project Classification

**This is an INDEPENDENT third-party open source project**, not an official eBay project. It uses eBay's public APIs and is developed by independent contributors.

- **NOT** an official eBay project
- **NOT** developed by eBay employees
- **NOT** affiliated with, endorsed by, or sponsored by eBay Inc.
- Uses eBay's public APIs under their Developer Program Terms

## eBay Open Source Policy Compliance

### License Status ✅

**Current License:** MIT License

According to [eBay's Open Source Licensing Policy](https://opensource.ebay.com/licenses/):

| License Type | Status | Notes |
|--------------|--------|-------|
| **MIT** | ✅ GREEN | Approved for use without OSPO review |
| Apache 2.0 | ✅ GREEN | eBay's preferred outbound license |
| BSD-2 | ✅ GREEN | Also acceptable |

**Our Choice:** MIT is on eBay's "green" list of acceptable licenses, meaning it can be used without approval from eBay's Open Source Program Office (OSPO).

**Note:** While eBay prefers Apache 2.0 for their own projects, MIT is equally acceptable for independent projects and provides:
- Simple, permissive licensing
- Wide community acceptance
- Clear liability disclaimers
- Easy to understand for contributors

### Repository Best Practices ✅

According to [eBay's Repository Best Practices](https://opensource.ebay.com/repository-best-practices/):

| Requirement | Status | Location |
|------------|--------|----------|
| **README file** | ✅ COMPLETE | [README.md](README.md) |
| **LICENSE file** | ✅ COMPLETE | [LICENSE](LICENSE) |
| **CONTRIBUTING guide** | ✅ COMPLETE | [CONTRIBUTING.md](CONTRIBUTING.md) |

All required files are present and comprehensive.

## eBay API Terms of Use Compliance

### Required Disclaimers ✅

The project includes prominent disclaimers (README.md lines 19-54):

1. **NOT an official eBay project** - Clearly stated in disclaimer section
2. **NOT affiliated with eBay Inc.** - Explicitly mentioned
3. **Unofficial third-party implementation** - Labeled as such
4. **User responsibility** - Users must comply with eBay's API Terms

### eBay API Terms Reference ✅

Direct link to official terms: [eBay's API Terms of Use](https://developer.ebay.com/join/api_license_agreement)

Users are explicitly instructed to:
- ✅ Comply with eBay's API Terms of Use
- ✅ Stay within eBay's rate limits and policies
- ✅ Manage eBay Developer credentials securely
- ✅ Test in sandbox environment before production
- ✅ Monitor API usage in Developer Portal

### Developer Program Integration ✅

The project properly integrates with eBay's Developer Program:

1. **Credential Management**
   - Requires eBay Developer Account
   - Uses Client ID and Client Secret from Developer Portal
   - Supports OAuth 2.0 user tokens
   - Automatic token refresh

2. **Environment Separation**
   - Sandbox environment for testing
   - Production environment for live usage
   - Clear documentation on environment switching

3. **Rate Limit Compliance**
   - Client Credentials: 1,000 requests/day
   - User Tokens: 10,000-50,000 requests/day
   - Automatic retry with exponential backoff
   - Rate limit error handling

4. **API Coverage**
   - 99.1% coverage of eBay Sell APIs
   - 230+ tools across all API categories
   - Follows eBay API specifications
   - OpenAPI-generated types for accuracy

## Security and Responsible Use

### Security Measures ✅

From [SECURITY.md](SECURITY.md):

1. **Vulnerability Reporting**
   - GitHub Security Advisory: https://github.com/YosefHayim/ebay-mcp/security/advisories/new
   - Email contact: yosefhayim.sabag@gmail.com
   - Responsible disclosure process

2. **Security Best Practices**
   - Token security guidelines
   - Environment variable protection
   - OAuth 2.0 implementation
   - Sandbox vs production separation

### User Responsibility ✅

Users are explicitly informed they must:
- Test in sandbox before production
- Understand API calls made on their behalf
- Maintain backups of critical data
- Monitor API usage and account status
- Follow security best practices

## Contributing Guidelines

### eBay API Terms for Contributors ✅

From [CONTRIBUTING.md](CONTRIBUTING.md):

Contributors agree that:
- Contributions are licensed under MIT License
- Code must follow TypeScript strict mode
- All external inputs must be validated (Zod schemas)
- Tests must maintain 90%+ coverage
- Documentation must be updated

### Quality Standards ✅

- ✅ **Type Safety:** Full TypeScript with strict mode
- ✅ **Input Validation:** Zod schemas for all MCP tools
- ✅ **Testing:** 870+ tests, 99%+ function coverage
- ✅ **Code Quality:** ESLint, Prettier, conventional commits
- ✅ **Documentation:** Comprehensive README and guides

## Compliance Summary

| Category | Requirement | Status |
|----------|-------------|--------|
| **License** | Acceptable open source license | ✅ MIT (green) |
| **Documentation** | README, LICENSE, CONTRIBUTING | ✅ Complete |
| **Disclaimers** | NOT affiliated with eBay | ✅ Clear |
| **API Terms** | Link to eBay Terms of Use | ✅ Present |
| **Security** | Vulnerability reporting process | ✅ Established |
| **Best Practices** | Follow repository standards | ✅ Compliant |
| **Testing** | Comprehensive test coverage | ✅ 870+ tests |
| **Developer Program** | Proper credential management | ✅ Compliant |
| **Rate Limits** | Respect eBay rate limits | ✅ Implemented |
| **Environments** | Sandbox/production separation | ✅ Supported |

## Recommendations

### Current Status: FULLY COMPLIANT ✅

The ebay-mcp project is **fully compliant** with:
1. eBay's Open Source licensing policies (MIT is "green")
2. eBay's Repository Best Practices
3. eBay Developer Program Terms of Use
4. eBay API Terms and conditions
5. Community best practices for open source projects

### Optional Enhancements

While not required, the project could consider:

1. **Apache 2.0 License (Optional)**
   - eBay's preferred license for their own projects
   - Provides explicit patent grant protection
   - More comprehensive contributor protections
   - Both MIT and Apache 2.0 are equally "green"
   - **Decision:** MIT is perfectly acceptable for independent projects

2. **eBay Acknowledgment (Optional)**
   - Current acknowledgment is appropriate
   - Clear that project uses eBay APIs
   - Proper attribution to eBay Developer Program

## References

- [eBay Open Source Program](https://opensource.ebay.com/)
- [eBay License Policy](https://opensource.ebay.com/licenses/)
- [eBay Repository Best Practices](https://opensource.ebay.com/repository-best-practices/)
- [eBay Developer Program](https://developer.ebay.com/)
- [eBay API Terms of Use](https://developer.ebay.com/join/api_license_agreement)
- [eBay API Documentation](https://developer.ebay.com/docs)

## Last Updated

2025-11-17

---

**Status:** ✅ COMPLIANT - This project meets all eBay developer policies and open source best practices.
