import React from "react";
import { MediaViewer } from "@atlaskit/media-viewer";

const defaultAuthParameter = {
  authType: "client",
};

const defaultCollectionName = "MediaServicesSample";
const onlyAnimatedGifsCollectionName = "only-animated-gifs";
const fileCollectionName = `${defaultCollectionName}Files`;
const defaultMediaPickerCollectionName = "mediapicker-test";

const collectionNames = [
  defaultCollectionName,
  "MediaServicesSampleAtlaskit",
  "MediaServicesSampleHulk",
  "MediaServicesSampleFabric",
  fileCollectionName,
  onlyAnimatedGifsCollectionName,
  defaultMediaPickerCollectionName,
];

const createStorybookMediaClientConfig = (
  authParameter = defaultAuthParameter
) => {
  const scopes = {
    "urn:filestore:file:*": ["read"],
    "urn:filestore:chunk:*": ["read"],
  };
  collectionNames.forEach((c) => {
    scopes[`urn:filestore:collection:${c}`] = ["read", "update"];
  });

  const isAsapEnvironment = authParameter.authType === "asap";
  const authProvider = StoryBookAuthProvider.create(isAsapEnvironment, scopes);
  return { authProvider };
};

const cachedAuths = {};
const authProviderBaseURL = "https://media-playground.dev.atl-paas.net/";

export class StoryBookAuthProvider {
  static create(isAsapEnvironment, access) {
    const loadTenatAuth = async (collectionName) => {
      const environment = isAsapEnvironment ? "asap" : "";
      const headers = new Headers();
      headers.append("Content-Type", "application/json; charset=utf-8");
      headers.append("Accept", "text/plain, */*; q=0.01");
      const config = {
        method: "POST",
        headers,
        body: access ? JSON.stringify({ access }) : undefined,
      };
      const url = `${authProviderBaseURL}/token/tenant?collection=${collectionName}&environment=${environment}`;
      const response = fetch(url, config);

      // We leverage the fact, that our internal /toke/tenant API returns data in the same format as Auth
      return await (await response).json();
    };

    return (authContext) => {
      const collectionName =
        (authContext && authContext.collectionName) || defaultCollectionName;
      const accessStr = access ? JSON.stringify(access) : "";
      const cacheKey = `${collectionName}-${accessStr}-${isAsapEnvironment}`;

      if (!cachedAuths[cacheKey]) {
        cachedAuths[cacheKey] = loadTenatAuth(collectionName);
      }
      return cachedAuths[cacheKey];
    };
  }
}

const fileType = "file";
const collectionName = "MediaServicesSample";
const mediaClientConfig = createStorybookMediaClientConfig();

function App() {
  // return (
  //   <MediaViewer
  //     mediaClientConfig={mediaClientConfig}
  //     selectedItem={{
  //       id: "5556346b-b081-482b-bc4a-4faca8ecd2de", // jpg image
  //       mediaItemType: fileType,
  //       collectionName,
  //     }}
  //     dataSource={{
  //       list: [
  //         {
  //           id: "1b01a476-83b4-4f44-8192-f83b2d00913a", // mp4 video
  //           mediaItemType: fileType,
  //           collectionName,
  //         },
  //       ],
  //     }}
  //     collectionName={collectionName}
  //   />
  // );
  return (
    <MediaViewer
      selectedItem={{
        id: "5556346b-b081-482b-bc4a-4faca8ecd2de", // jpg image
        mediaItemType: fileType,
        collectionName,
      }}
      collectionName={collectionName}
      dataSource={{
        list: [
          {
            id: "26adc5af-3af4-42a8-9c24-62b6ce0f9369",
            mediaItemType: fileType,
            collectionName,
          },
        ],
      }}
      mediaClientConfig={mediaClientConfig}
      featureFlags={{
        newCardExperience: true,
      }}
    />
  );
}

export default App;
