package main

// まだ動いていません

import (
	"context"
	"log"

	"github.com/olivere/elastic"
)

func MainMax() {
	context_ := context.Background()

	elasticClient, err := elastic.NewClient(elastic.SetURL("http://localhost:9200"),
		elastic.SetSniff(false)) // SetSniff is requested in ElasticSearch in Docker
	if err != nil {
		log.Fatal(err)
	}

	if !(indexExists(elasticClient)) {
		mapping := `{
			"mappings": {
				"doc": {
					"properties": {
						"product_id": { "type": "keyword" },
						"price": { "type": "integer" },
						"count": { "type": "integer" }
					}
				}
			}
		}`
		products := []ProductTable{
			{"A", 100, 1},
			{"A", 100, 3},
			{"B", 150, 4},
			{"B", 150, 2},
			{"A", 100, 2},
		}

		_, err := elasticClient.CreateIndex("tablea").BodyString(mapping).Do(context_)
		if err != nil {
			log.Fatal(err)
		}
		for _, product := range products {

			// Insert a document
			_, err = elasticClient.Index().
				Index("index-a").
				Type("doc"). // For ElasticSearch v6 or earlier
				BodyJson(product).
				Do(context_)
			if err != nil {
				log.Fatal(err)
			}
		}

		// Elasticsearchの組み込みリフレッシュAPIを呼び出すことで、すべての追加されたデータを検索可能にします。
		_, err = elasticClient.Refresh("index-a").Do(context_)
		if err != nil {
			log.Fatal(err)
		}
	}

	aggregation := elastic.NewTermsAggregation().Field("product_id").
		SubAggregation("max_count", elastic.NewMaxAggregation().Field("count"))

	searchResult, err := elasticClient.Search("index-a").
		Type("doc").
		Aggregation("products", aggregation).
		Do(context.Background())
	if err != nil {
		log.Fatal(err) //  elastic: Error 400 (Bad Request): all shards failed [type=search_phase_execution_exception]
	}

	aggregationResponse, found := searchResult.Aggregations.Terms("products")
	if !(found) {
		log.Fatal("no results")
	}

	for _, bucket := range aggregationResponse.Buckets {
		maxCountRes, found := bucket.Max("max_count")
		if found {
			log.Printf("Product ID: %v, Max count: %v\n", bucket.Key, maxCountRes.Value)
		}
	}

	// SELECT product_ID, MAX(count) FROM index-a GROUP BY product_ID 相当の集約クエリ
	// 	agg := elastic.NewTermsAggregation().Field("product_id").SubAggregation("max_count", elastic.NewMaxAggregation().Field("count"))
	// 	response, err := elasticClient.Search("index-a").Aggregation("products", agg).Do(context_)
	// 	if err != nil {
	// 		log.Fatal(err)
	// 	}
	//
	// 	// 結果の取得
	// 	aggRes, _ := response.Aggregations.Terms("products")
	// 	for _, bucket := range aggRes.Buckets {
	// 		productID := bucket.Key.(string)
	// 		maxCount, _ := bucket.Max("max_count")
	// 		log.Printf("Product ID: %s, Max Count: %.0f", productID, *maxCount.Value)
	// 	}
	//
	// 	os.Exit(0)
}

func indexExists(elasticClient *elastic.Client) bool {
	indexCat := elasticClient.CatIndices()
	indexCat.Index("*")
	indices, err := indexCat.Do(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	return len(indices) >= 1
}
