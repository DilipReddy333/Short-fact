import React from "react";
import { useState, useEffect } from "react";
import RenderVideo from "./RenderVideo";
import { Client, ID, Storage } from "appwrite";
import Swal from "sweetalert2";
import Loader from "./Loader";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("660c2ea8a593f313f99c");

const storage = new Storage(client);
const BUCKET_ID = "660c30b58d343c8ef069";

const FactShort = () => {
  const [shortsPreview, setShortsPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaderText, setLoaderText] = useState("");

  // getAllShorts to list all files
  const getAllShorts = () => {
    setLoading(true);
    setLoaderText("Fetching all shorts");
    const allShorts = storage.listFiles(BUCKET_ID);
    allShorts
      .then((resp) => {
        // console.log(resp.files);
        const allFiles = resp.files;
        // console.log(shortsFilesPreview);
        setLoading(false);
        setShortsPreview(allFiles);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleShortFile = (e) => {
    const shortFile = e.target.files[0];
    if (!shortFile) {
      return;
    }
    setLoading(true);
    setLoaderText("Uploading");
    const uploadFile = storage.createFile(BUCKET_ID, ID.unique(), shortFile);
    uploadFile
      .then((resp) => {
        // console.log("uploaded file ", resp); // {$id,bucketID,name}
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Short uploaded",
          text: "Your Id has uploaded successfully!",
          confirmButtonText: "Cool",
        });
        setShortsPreview((prev) => [resp, ...prev]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const deleteShort = (fileId) => {
    // console.log(fileId);
    setLoading(true);
    setLoaderText("Deleting");
    const shortToDelete = storage.deleteFile(BUCKET_ID, fileId);
    shortToDelete
      .then((resp) => {
        // console.log(resp);
        setLoading(false);
        setLoaderText("");
        Swal.fire({
          icon: "success",
          title: "Short deleted!",
          text: "Your short has been deleted!",
          confirmButtonText: "Done",
        });
        const filteredShorts = shortsPreview.filter(
          (short) => short.$id !== fileId
        );
        setShortsPreview(filteredShorts);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className='container'>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "10vh",
        }}
      >
        <label htmlFor='Id-file' style={{ fontWeight: "bold" }}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='shadow-sm'
            htmlFor='Id-file'
            style={{
              width: "34px",
              height: "34px",
              padding: "2px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5'
            />
          </svg>
          <input
            type='file'
            name='file'
            id='Id-file'
            style={{ display: "none" }}
            accept='video/mp4,video/x-m4v,video/*'
            onChange={handleShortFile}
          />
          upload short
        </label>
      </div>
      {loading && <Loader loaderText={loaderText} />}
      <button
        className='btn btn-primary shadow-none mt-2 mb-2'
        onClick={getAllShorts}
      >
        Get all Shorts
      </button>
      {/* if Id render video */}
      <div
        className='col-md-12'
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "4px",
        }}
      >
        {shortsPreview?.length > 0 ? (
          <>
            {shortsPreview.map((short, i) => {
              return (
                <div key={i} className='col-md-4'>
                  <RenderVideo
                    // src={fileSrc.href}
                    name={short.name}
                    shortID={short.$id}
                    deleteShort={deleteShort}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <h4
            className='p-3'
            style={{
              border: "1px solid gray",
              borderRadius: "5px",
              backgroundColor: "#ccc",
            }}
          >
            No shorts to display
          </h4>
        )}
      </div>
    </div>
  );
};

export default FactShort;
