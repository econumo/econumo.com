URL: https://econumo.com/docs/user-guide/csv-import-export/

# CSV Import & Export

This section provides an overview of 'CSV Import & Export' in Econumo.

## In this section

- [Exporting your transactions to CSV](/docs/user-guide/csv-import-export/#exporting-your-transactions-to-csv)
- [Importing transactions from CSV](/docs/user-guide/csv-import-export/#importing-transactions-from-csv)

---
## Exporting your transactions to CSV

You can export your transactions to a CSV file for use in other applications
or for backup purposes.

To export your transactions:

1. Navigate to **Settings**.
2. Click on **Export CSV**.
3. Select the account(s) you want to export transactions from.
4. Click **Export** to download the CSV file.

<ScreenshotSet>

</ScreenshotSet>

---
## Importing transactions from CSV

Econumo allows you to import transactions from a CSV file. This is useful for
migrating data from other financial applications or for bulk adding
transactions.

CSV import requires the CSV file to be in a specific format. It must be
comma-separated values and include the following columns: Date, Amount, and
Account name. Optional columns are: Category, Description, Tags, and Payee
(Sender/Recipient).

The "Amount" column should contain positive values for income and negative
values for expenses. Alternatively, you can choose to import data from two
columns, "Inflow" and "Outflow," instead of "Amount".

To import transactions from a CSV file:

1. Navigate to **Settings**.
2. Click on **Import CSV**.
3. Choose the CSV file you want to import (up to 10 MB).
4. Map the CSV columns to the corresponding fields in Econumo — the required
   fields (Account, Date, Amount) are marked with an asterisk.
5. Click **Import** to add the transactions to your account.

<ScreenshotSet>

</ScreenshotSet>

**Note**
Example CSV format:
```csv
account_name,category,description,tag,payee,amount,spent_at
"Credit Card",Groceries,,,Costco,-500,"2026-01-04 13:01:32"
"Credit Card",Gas,,,Chevron,-50,"2026-01-04 13:01:51"
"Credit Card",Gifts,,,Costco,-100,"2026-01-04 13:03:51"
"Credit Card","Car Service",,car,,-150,"2026-01-04 13:04:51"
Cash,,,,,500,"2026-01-04 12:59:09"
Cash,Salary,,,,5000,"2026-01-04 13:02:17"
Cash,,"Transfer of 1000 USD to Savings",,,-1000,"2026-01-04 13:04:07"
Savings,,"Transfer of 1000 USD from Cash",,,1000,"2026-01-04 13:04:07"
Savings,,,,,20000,"2026-01-04 13:01:01"
```
