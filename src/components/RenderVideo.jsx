import React from "react";
import { Client, ID, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("660c2ea8a593f313f99c");

const storage = new Storage(client);
const BUCKET_ID = "660c30b58d343c8ef069";
let fileSrc;

const RenderVideo = (props) => {
  // console.log(props);
  fileSrc = storage.getFileView(BUCKET_ID, props.shortID);
  // console.log(fileSrc.href);
  return (
    <div
      className='col-md-12'
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <video
        style={{ width: "300px" }}
        // className='w-auto'
        src={fileSrc.href}
        muted
        controls
      />
      {/* to delete the video */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        onClick={() => props.deleteShort(props.shortID)}
        style={{
          width: "34px",
          height: "34px",
          padding: "2px",
          borderRadius: "5px",
          backgroundColor: "#FF6363",
          color: "white",
          cursor: "pointer",
          position: "absolute",
          top: "15px",
          left: "15px",
        }}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
        />
      </svg>
      <h5>{props.name}</h5>
    </div>
  );
};

export default RenderVideo;
