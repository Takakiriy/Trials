package main

import (
	"context"
	"fmt"
	"log"
	"reflect"

	"github.com/olivere/elastic"
)

type SelectedProductTable struct {
	ProductID string `json:"product_id"`
	Count     int    `json:"count"`
}

func MainSelect() {
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

	fieldSelector := elastic.NewFetchSourceContext(true).Include("product_id", "count")

	searchResult, err := elasticClient.Search("index-a").
		Type("doc").
		FetchSourceContext(fieldSelector).
		Do(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	for _, item := range searchResult.Each(reflect.TypeOf(SelectedProductTable{})) {
		if record, ok := item.(SelectedProductTable); ok {

			fmt.Println(record)
			//     {A 1}
			//     {A 3}
			//     {B 2}
			//     {B 4}
			//     {A 2}
		}
	}
}
