import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ gamelog }) => {
  const [chartOption, setChartOption] = useState("points");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    switch (chartOption) {
      case "points":
        setChartData(gamelog?.map((game) => game.points));
        break;
      case "rebounds":
        setChartData(gamelog?.map((game) => game.rebounds));
        break;
      case "assists":
        setChartData(gamelog?.map((game) => game.assists));
        break;
      case "blocks":
        setChartData(gamelog?.map((game) => game.blocks));
        break;
      case "steals":
        setChartData(gamelog?.map((game) => game.steals));
        break;
      case "turnovers":
        setChartData(gamelog?.map((game) => game.turnovers));
        break;
      default:
        setChartData(gamelog?.map((game) => game.points));
    }
  }, [chartOption, gamelog]);

  const chartLabels = gamelog?.map((game) =>
    moment.utc(game.date).format("YYYY-MM-DD")
  );

  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
        borderColor: "#1D428A",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <>
      {
      gamelog.length === 0 
      ? 
      <></> 
      : 
      <>
            <div className="line-chart-container">
        <div className="chart-title">Charts</div>
        <Container className="btn-group-container">
          <Row>
            <ButtonGroup className="btn-group" size="sm">
              <Button
                className={
                  chartOption === "points" ? "team-btn-active" : "team-btn"
                }
                onClick={() => setChartOption("points")}
              >
                PTS
              </Button>
              <Button
                className={
                  chartOption === "rebounds" ? "team-btn-active" : "team-btn"
                }
                onClick={() => setChartOption("rebounds")}
              >
                REB
              </Button>
              <Button
                className={
                  chartOption === "assists" ? "team-btn-active" : "team-btn"
                }
                onClick={() => setChartOption("assists")}
              >
                AST
              </Button>
              <Button
                className={
                  chartOption === "blocks" ? "team-btn-active" : "team-btn"
                }
                onClick={() => setChartOption("blocks")}
              >
                BLK
              </Button>
              <Button
                className={
                  chartOption === "steals" ? "team-btn-active" : "team-btn"
                }
                onClick={() => setChartOption("steals")}
              >
                STL
              </Button>
              <Button
                className={
                  chartOption === "turnovers" ? "team-btn-active" : "team-btn"
                }
                onClick={() => setChartOption("turnovers")}
              >
                TOV
              </Button>
            </ButtonGroup>
          </Row>
        </Container>
        <div className="chart-subtitle">{chartOption}</div>

        <Line className="line-chart" data={data} options={options} />
      </div>
      </>
      }

    </>
  );
};

export default LineChart;
