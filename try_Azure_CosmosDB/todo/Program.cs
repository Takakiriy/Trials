using System;
using System.Threading.Tasks;
using System.Configuration;
using System.Collections.Generic;
using System.Net;
using Microsoft.Azure.Cosmos;

namespace todo
{
public class Program
{
	private string databaseId = "FamilyDatabase";
	private string containerId = "FamilyContainer";

	private string EndpointUrl = Environment.GetEnvironmentVariable("EndpointUrl");
	private string PrimaryKey = Environment.GetEnvironmentVariable("PrimaryKey");
	private CosmosClient cosmosClient;
	private Database database;
	private Container container;


	// Main()
	public static async Task  Main(string[] args) {
		try {
			Console.WriteLine("Beginning operations...\n");
			Program p = new Program();

			await p.GetStartedDemoAsync();
		}
		catch (CosmosException de) {
			Exception baseException = de.GetBaseException();
			Console.WriteLine("{0} error occurred: {1}", de.StatusCode, de);
		}
		catch (Exception e) {
			Console.WriteLine("Error: {0}", e);
		}
		finally {
			Console.WriteLine("End of demo, press any key to exit.");
			Console.ReadKey();
		}
	}


	// GetStartedDemoAsync()
	public async Task  GetStartedDemoAsync()
	{
		this.cosmosClient = new CosmosClient(EndpointUrl, PrimaryKey);

		await this.CreateDatabaseAsync();
		await this.CreateContainerAsync();

		await this.AddItemsToContainerAsync();

		await this.QueryItemsAsync();
	}


	// CreateDatabaseAsync()
	// データベースのハンドルを取得する。 ただし、もし、データベースが無かったら追加する。
	private async Task  CreateDatabaseAsync() {
		this.database = await this.cosmosClient.CreateDatabaseIfNotExistsAsync(databaseId);
		Console.WriteLine("Created Database: {0}\n", this.database.Id);
	}


	// CreateContainerAsync()
	// コンテナーのハンドルを取得する。 ただし、もし、コンテナーが無かったら追加する。
	private async Task  CreateContainerAsync() {
		this.container = await this.database.CreateContainerIfNotExistsAsync(containerId, "/LastName");
		Console.WriteLine("Created Container: {0}\n", this.container.Id);
	}


	// AddItemsToContainerAsync()
	// アイテムを追加する
	private async Task  AddItemsToContainerAsync() {

		// andersenFamily = ...
		Family  andersenFamily = new Family {
			Id = "Andersen.1",
			LastName = "Andersen",
			Parents = new Parent[] {
				new Parent { FirstName = "Thomas" },
				new Parent { FirstName = "Mary Kay" }
			},
			Children = new Child[] {
				new Child
				{
					FirstName = "Henriette Thaulow",
					Gender = "female",
					Grade = 5,
					Pets = new Pet[]
					{
						new Pet { GivenName = "Fluffy" }
					}
				}
			},
			Address = new Address { State = "WA", County = "King", City = "Seattle" },
			IsRegistered = false
		};

		try {
			// Create an item in the container representing the Andersen family. Note we provide the value of the partition key for this item, which is "Andersen".

			// CreateItemAsync()
			ItemResponse<Family> andersenFamilyResponse =
				await this.container.CreateItemAsync<Family>(
					andersenFamily,
					new PartitionKey( andersenFamily.LastName )
				);

			// Note that after creating the item, we can access the body of the item with the Resource property of the ItemResponse. We can also access the RequestCharge property to see the amount of RUs consumed on this request.
			Console.WriteLine("Created item in database with id: {0} Operation consumed {1} RUs.\n", andersenFamilyResponse.Resource.Id, andersenFamilyResponse.RequestCharge);
		}
		catch (CosmosException ex) when (ex.StatusCode == HttpStatusCode.Conflict)
		{
			Console.WriteLine("Item in database with id: {0} already exists\n", andersenFamily.Id);                
		}
	}


	// QueryItemsAsync()
	private async Task QueryItemsAsync()
	{
		// sqlQueryText = ...
		var sqlQueryText = "SELECT * FROM c WHERE c.LastName = 'Andersen'";
		Console.WriteLine("Running query: {0}\n", sqlQueryText);
		QueryDefinition queryDefinition = new QueryDefinition(sqlQueryText);

		// GetItemQueryIterator()
		FeedIterator<Family> queryResultSetIterator = this.container.GetItemQueryIterator<Family>(queryDefinition);
		List<Family> families = new List<Family>();

		while (queryResultSetIterator.HasMoreResults)
		{
			// ReadNextAsync()
			FeedResponse<Family> currentResultSet = await queryResultSetIterator.ReadNextAsync();
			foreach (Family family in currentResultSet) {

				families.Add(family);
				Console.WriteLine("\tRead {0}\n", family);
			}
		}
	}


	// DeleteDatabaseAndCleanupAsync()
	private async Task  DeleteDatabaseAndCleanupAsync()
	{
		// DeleteAsync()
		DatabaseResponse databaseResourceResponse = await this.database.DeleteAsync();
		// Also valid: await this.cosmosClient.Databases["FamilyDatabase"].DeleteAsync();

		Console.WriteLine("Deleted Database: {0}\n", this.databaseId);

		//Dispose of CosmosClient
		this.cosmosClient.Dispose();
	}
}
}
