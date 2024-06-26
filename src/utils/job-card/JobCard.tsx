import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

export default function JobCard({ job }: any) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
    >
      <CardHeader
        avatar={<img src={job?.logoUrl} style={{ width: "50px" }} alt="logo" />}
        title={
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "1px",
              marginBottom: "3px",
              color: "#8b8b8b",
            }}
          >
            {job.companyName || "NA"}
          </div>
        }
        subheader={
          <>
            <div
              style={{
                fontSize: "14px",
                lineHeight: "1.5",
                color: "rgba(0, 0, 0, 0.87)",
              }}
            >
              {job?.jobRole || "NA"}
            </div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 500,
                marginTop: "5px",
                color: "rgba(0, 0, 0, 0.87)",
              }}
            >
              {job.location || "NA"}
            </div>
          </>
        }
      />
      <CardContent>
        <Typography
          variant="body2"
          style={{
            fontSize: "1rem",
            color: "rgba(0, 0, 0, 0.87)",
            fontWeight: "500",
          }}
          color="text.secondary"
        >
          About Company
        </Typography>
        <Typography
          variant="body2"
          style={{ fontSize: "14px", fontWeight: "bold" }}
        >
          About us
        </Typography>
        <Typography variant="body2" style={{ fontSize: "14px" }}>
          {expanded
            ? job?.jobDetailsFromCompany
            : `${job?.jobDetailsFromCompany?.substring(0, 300)}...`}
        </Typography>
        {job?.jobDetailsFromCompany?.length > 100 && (
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ cursor: "pointer", textAlign: "center", color: "blue" }}
            onClick={handleExpandClick}
          >
            {expanded ? "See Less" : "See More"}
          </Typography>
        )}
        <div style={{ padding: "20px 0 0 0" }}>
          <Typography
            style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "1px",
              marginBottom: "3px",
              color: "#8b8b8b",
            }}
          >
            Minimum Experience
          </Typography>
          <Typography style={{ fontSize: "14px", lineHeight: "1.5" }}>
            {job?.minExp || "NA"}
          </Typography>
        </div>
      </CardContent>
      <CardActions style={{ padding: "16px" }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "rgb(85, 239, 196)",
            color: "rgb(0, 0, 0)",
            fontWeight: "600",
            padding: "8px 18px",
            textTransform: "none",
          }}
          fullWidth
        >
          Easy Apply
        </Button>
      </CardActions>
    </Card>
  );
}
