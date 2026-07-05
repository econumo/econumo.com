URL: https://econumo.com/docs/self-hosting/tweaking-backend/

# Tweaking the backend

**WARNING!**
In general, tweaking is not recommended; please do so at your own risk.

If you are familiar with PHP and Symfony, you can add functionality to the backend, such as:

- Custom CLI commands;
- New APIs;
- Additional handlers for domain events.

However, keep in mind that your code may break at some point due to changes in the Econumo codebase.

## How to do that

Econumo uses a modified [Symfony Kernel](https://github.com/econumo/econumo/blob/main/src/Kernel.php) to load all bundles from the `src` folder.

A good example is the [EconumoToolsBundle](https://github.com/econumo/econumo/tree/main/src/EconumoToolsBundle).

To make it work, you must:

1. Create a folder with the `Bundle` suffix, for example, `MyBundle`.
2. Create a file named `MyBundle/MyBundle.php`, which extends `Symfony\Component\HttpKernel\Bundle\Bundle` and includes a public `isActive` method.
3. Create a file named `MyBundle/Resources/config/services.yaml` for dependency injection.
4. Mount the `MyBundle` folder in the Econumo Docker Compose to `/var/www/src/MyBundle`.
5. Restart your Docker Compose.
