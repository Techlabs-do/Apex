Apex is a Node HTTP client aimed at REST API's for AWS Lambda. It is configured to have sane defaults so that you need not worry about configuration. The design focus of Apex is to simplify the integration of AWS services within your NodeJS applications, allowing for a more streamlined development process.

## Technology Stack

- NodeJS
- AWS Lambda

## Installation

1. Add Apex to your project using Yarn:
   ```bash
   yarn add apex
   ```

## Usage

To get started with Apex, follow these steps:

1. Import the Apex framework
   ```javascript
   const Apex = require('apex');
   ```

2. Initialize and configure your AWS services
   ```javascript
   const awsServices = new Apex(/* AWS Configuration Here */);
   ```

3. Now, you're ready to use your AWS services within your application!

## Contribution

Contributions are welcome! If you'd like to contribute to Apex, please follow the [contribution guidelines](CONTRIBUTING.md).

## License

Apex is licensed under the MIT License. See [LICENSE](LICENSE.md) for more information.

## Testing

To run the tests, execute the following command:

```bash
yarn test
```

## Contact

If you have any questions or need further assistance, please feel free to reach out at [info@techlabs.cc](mailto:info@techlabs.cc).

## Credits

Special thanks to all the contributors who have helped make Apex a powerful tool for integrating AWS services.

---

Made with :heart: by [TechLabs](https://techlabs.cc)
