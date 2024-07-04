<script lang="ts">
    import { Line } from 'svelte-chartjs';
    import{
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
        Filler
    } from 'chart.js';

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
        Filler
    );

    import {onMount} from "svelte";


    let oxygen: Oxygen[];
    let labels_graph: string[] = [];
    let oxygen_graph: number[] = [];
    let heartRate: HeartRate[] = [];
    let heart_rate_graph: number[] = [];

    onMount(async function () {
        const response_price = await fetch(__API_ADDRESS__ + "/api/StockDataFor/" + title);
        const params_price = await response_price.json();
        const response_sentiment = await fetch(__API_ADDRESS__ + "/api/historicalSentiments/" + title);
        const data_sentiment = await response_sentiment.json();
        console.log(params_price);
        console.log(data_sentiment);
        oxygen = params_price;
        heartRate = data_sentiment;
        for(let i = oxygen.length-1; i >= 0; i--) {
            oxygen_graph.push(Number(oxygen[i].stock_price_val));
            labels_graph.push(oxygen[i].stock_price_time.slice(0, 10));
        }
        for(let i = heartRate.length-1; i >= 0; i--){
            let sentiment = Math.round(Number(heartRate[i].avg_sentiment)*100)/ 100
            heart_rate_graph.push(sentiment);

        }
        oxygen_graph = oxygen_graph;
        heart_rate_graph = heart_rate_graph;
    });

    interface Oxygen {
        stock_price_val: string;
        stock_price_time: string;
    }

    interface HeartRate {
        name: string;
        ticker_symbol: string;
        avg_sentiment: string;
        pub_date: string;
    }


    $: data = {
        labels: labels_graph,
        datasets: [
            {
                label: 'Oxygen',
                data: heart_rate_graph,
                yAxisID: 'y',
                tension: 0.3,
                borderWidth: 0,
                fill: {
                    target: 'origin',
                    above: 'rgba(0, 150, 100, 0.7)',
                    below: 'rgba(255, 0, 0, 0.7)'
                },
                pointRadius: 1
            },
            {
                label: 'Heart Rate in bpm',
                data: oxygen_graph,
                borderColor: 'black',
                borderWidth: 2,
                pointRadius: 1,
                tension:0.3,
                fill: false,
                yAxisID: 'y1'
            }
        ]
    };

</script>

<style>
    main{
        border: 1px solid gainsboro;
        padding: 20px;
        border-radius: 8px;
        margin-top: 20px;
        margin-bottom: 50px;
    }

    h2{
        font-weight: bold;
        font-size: larger;
    }
</style>

<main>
    <h2>Pulse Data Graph</h2>
    <div class="graph">
        <Line data = {data}
              height = {700}
              options={
                  {
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                          xAxis: {
                              reverse: true,
                              display: true
                          },
                          y: {
                              min: -1,
                              max: 1
                          },
                          x: {
                              display: false,
                              ticks: {
                                  display: false
                              }
                          }
                      }
                  }
              }
        />
    </div>
</main>