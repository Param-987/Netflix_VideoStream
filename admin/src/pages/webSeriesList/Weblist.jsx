import "./webList.css";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Link } from "react-router-dom";
import { useContext } from "react";
import { useEffect } from "react";
import { SeriesListContext } from "../../context/webSeriesContext/WebContext";
import { getWeb } from "../../context/webSeriesContext/apiCalls";

export default function  WebList() {
  const {seriesList,dispatch} = useContext(SeriesListContext)

  useEffect(()=>{
    getWeb(dispatch)
  },[dispatch])

  const handleDelete = ()=>{

  }

  const columns = [
    { field: "_id",   headerName: "ID", width: 250 },
    { field: "title", headerName: "title", width: 200 },
    { field: "genre", headerName: "Genre", width: 350 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname:"/weblist/" + params.row._id}} state = {{weblist:params.row}}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={seriesList}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId = {(r) => r._id}
      />
    </div>
  );
}
