﻿using ClassifiedAds.CrossCuttingConcerns.Csv;
using CsvHelper.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ClassifiedAds.Modules.Product.Csv;

public class ImportProductsFromCsvHandler : ICsvReader<ImportProductsFromCsv>
{
    public Task<ImportProductsFromCsv> ReadAsync(Stream stream)
    {
        using var reader = new StreamReader(stream);

        var config = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            HeaderValidated = null,
            MissingFieldFound = null,
        };

        using var csv = new CsvHelper.CsvReader(reader, config);

        var response = new ImportProductsFromCsv
        {
            Products = csv.GetRecords<Entities.Product>().ToList(),
        };

        return Task.FromResult(response);
    }
}
