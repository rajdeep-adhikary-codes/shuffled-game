/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["app.css","1f37ed8161624956c9056313129415d5"],["app.js","46a134fd620b3ba87da7fd0b30f70e30"],["btn.css","c9f441ddfb6776ff481a880344e86eff"],["confetti.css","f41a6ab528fff48ab8de2564933fc3de"],["favicon.ico","a7dd732447b9491c12f17827e2b39b47"],["icon.png","26b96afd97b5086c5f85fd16b50556a4"],["image_1/image.jpeg","36f4f67f3a03bac5b9cee681fa16f1bd"],["image_1/image/1.jpg","311d206700c7a1062b1dada10c032b31"],["image_1/image/2.jpg","70a7e2e9eb592b5cab3b3776c13089a1"],["image_1/image/3.jpg","7f4d8d7c31d18fde6eeac701fcf96d06"],["image_1/image/4.jpg","a7d162c423dcc77041555d6af77d096f"],["image_1/image/5.jpg","cbc9ed5cae8dd8a54f664eedf402ba1f"],["image_1/image/6.jpg","0d132ada1a6000f2fb332800f099c249"],["image_1/image/7.jpg","e6fffe10ff03c538f606db73970cb225"],["image_1/image/8.jpg","538d44aea96e34de6ed653e056ef0206"],["image_1/image/9.jpg","b1a8edf736230b68bef4e2dad50f2826"],["image_10/image.jpeg","5eb44a919db25ae199997717dc7cf5d9"],["image_10/image/1.jpg","1e0655221ff43aca59634307cf0e26fc"],["image_10/image/2.jpg","594ac72cb1374c04d24c5d7f66501a9d"],["image_10/image/3.jpg","34667d4b0225030efdc85f024ce77f9a"],["image_10/image/4.jpg","2167c184630cf93ed8d7e9700facc55f"],["image_10/image/5.jpg","996ac717fe670a840abbe8419bf0fa5a"],["image_10/image/6.jpg","6b4dbc5298626c4c2b4609d399eca61f"],["image_10/image/7.jpg","3a4a79ecc6e470ac1335a9bec2072b11"],["image_10/image/8.jpg","2ff088f436cb5075e013e94f4756aced"],["image_10/image/9.jpg","25f7fe3bfca92698f1ab5460ee5b66ab"],["image_11/image.jpeg","3083cdca836572b47ec6adf43aa9f883"],["image_11/image/1.jpg","6238b3d0eca65434c2a33d69d1f7a676"],["image_11/image/2.jpg","55112d88156446e830333cc2ce9cf1b2"],["image_11/image/3.jpg","4007a0864e703fa135d8aaffa21f290e"],["image_11/image/4.jpg","c80b3b2eee7506bff94da6b7b4146df2"],["image_11/image/5.jpg","d8a0107be659aeda76050c2b112c4c00"],["image_11/image/6.jpg","035300319432d8f164230cf576755feb"],["image_11/image/7.jpg","98ecf3a2b7b7cb270e7fe43eaeacbf53"],["image_11/image/8.jpg","5ac792af76f124c4aab418acea1e908e"],["image_11/image/9.jpg","7ed2bf48e08ebb0ddb35ca2dbe68b52b"],["image_12/image.jpeg","fccd5c42d4f9373c77b2f49f25d8d1bc"],["image_12/image/1.jpg","6d3e0757d8acd27e3bcb82fe3f7384f7"],["image_12/image/2.jpg","2fc183f1961e9afd6dd10992e3d0ba1e"],["image_12/image/3.jpg","63dbf88e31743ef1965ced1a6b13bcff"],["image_12/image/4.jpg","4c68fab8f0a75dafb86732094c3bce8b"],["image_12/image/5.jpg","a498d2fc61b17b0b9965055a36aec618"],["image_12/image/6.jpg","1389bb72f1568af518888eb978a45273"],["image_12/image/7.jpg","1f422676d5ce2f1b8cee278cfee342c5"],["image_12/image/8.jpg","044c04f1408e3760d69a38c3aa9b8266"],["image_12/image/9.jpg","7366b35753c38b5d5dc2c62ad3ce014e"],["image_13/image.jpeg","cc95009d11ca6c0c446604507c2d964d"],["image_13/image/1.jpg","5222da39d3566b241b916adac667a0f1"],["image_13/image/2.jpg","5028aea45c507156e299494349300c0b"],["image_13/image/3.jpg","4b386bf287a8c8e566d6eadb46565afb"],["image_13/image/4.jpg","832bf7ba53fcc48e7fd9dd4a79887b72"],["image_13/image/5.jpg","7a85b939d9b874d0ca2e36db074e3aba"],["image_13/image/6.jpg","58d6db737c2a449734facafb15c8e9ab"],["image_13/image/7.jpg","a12c812719d6609730ec8a993c4c8dcb"],["image_13/image/8.jpg","fc0fde869076d7d869e2ce78578273c2"],["image_13/image/9.jpg","5b21cbb1a66da104958d2b0ac92d7d2b"],["image_2/image.jpeg","81e4c2d1dc126dc7cba6e78e4d568b33"],["image_2/image/1.jpg","126b1ffb41de421818f584ac244b33db"],["image_2/image/2.jpg","7e6488b5617b80e14884b7cf126e5e18"],["image_2/image/3.jpg","85d1db07eb90fc9d59bf83f661fa140d"],["image_2/image/4.jpg","95a063ef072dafecf47a3010e16b3817"],["image_2/image/5.jpg","f8198b6689d62a6b444e1d53672e9960"],["image_2/image/6.jpg","5e001939a4afdc1caabfae4ec2480c94"],["image_2/image/7.jpg","ff1cfafe5918be5f179c800ae38a4af2"],["image_2/image/8.jpg","5fefe68e83f724f62ada2b1b507c7791"],["image_2/image/9.jpg","13daff4646ca868d79e8798ae33ba349"],["image_3/image.jpeg","8e9e9dcabfacfc88565cbd62eb1aedbe"],["image_3/image/1.jpg","4b6e5f05d3867ad8232e927dced4648e"],["image_3/image/2.jpg","66de48c449a33378a4b2198f42b40fc5"],["image_3/image/3.jpg","66f0045996910c61515fc13d92be3614"],["image_3/image/4.jpg","ec282ef48245e96db74d058c90a988a4"],["image_3/image/5.jpg","db40ca9fa785e96feb1671a456f63f35"],["image_3/image/6.jpg","2c32d78f7dc8e7ca14859987efaa034a"],["image_3/image/7.jpg","729bb55b2d27c3fbfb8dfc528745b884"],["image_3/image/8.jpg","8ba2526c6be9e7a75eecdd8bcdac6ec7"],["image_3/image/9.jpg","c170245c55708f87c37b950f3612f0a9"],["image_4/image.jpeg","81c4b0a0f260a0a76f53bc42313be30c"],["image_4/image/1.jpg","5b1b7428d8e66cbba3e7638a38670440"],["image_4/image/2.jpg","0fac8c84f36f5029799059e4215f7543"],["image_4/image/3.jpg","af36b3da0822e05e5da87642ed1d46d5"],["image_4/image/4.jpg","425050130a501c8d2559a094c64aeb9d"],["image_4/image/5.jpg","94391c1e52c8ca4d26a0f21cf878c137"],["image_4/image/6.jpg","ee2a4db6ad4841309bcc6380e5f9296d"],["image_4/image/7.jpg","ccdcef5d33e824e9b8451223164a979d"],["image_4/image/8.jpg","7537b462e04740f503073acce75a7899"],["image_4/image/9.jpg","02b51b518aa896912cbfd86ac2b28abd"],["image_5/image.jpeg","b771af6df06f86a5cd8cc9bfd068fb08"],["image_5/image/1.jpg","fdd8e6e4ba639c79b4090ce1ba40a41d"],["image_5/image/2.jpg","16a25bcded076f405c15967e53f37345"],["image_5/image/3.jpg","5462545f4a2454adb722518a337ba491"],["image_5/image/4.jpg","8855d4121839511bf5853d4e0a4e36db"],["image_5/image/5.jpg","f82bc430d5d3475070e349cad99dcd98"],["image_5/image/6.jpg","e395573e2fb9d2c639a5762c1e4aeaff"],["image_5/image/7.jpg","bc7b1568ea1e10a1238de42cc6f39d51"],["image_5/image/8.jpg","57cdac1ec4899edb6dd9214e6e525a71"],["image_5/image/9.jpg","6136900612ddf8d0cd8a2eb1959ded79"],["image_6/image.jpeg","6cda7b167fba6df8765bddd84f90a540"],["image_6/image/1.jpg","e68f4a12ffd4a32f85be29381e2c3ae8"],["image_6/image/2.jpg","dc03b19c79ab00d1145389b3adbe6fe7"],["image_6/image/3.jpg","966a40cafd84d607c6cddae3bc3a313c"],["image_6/image/4.jpg","0821c2de7da92b040cb754ac6cf0e17a"],["image_6/image/5.jpg","6dde48fea682de63142bc6bcc1ebe857"],["image_6/image/6.jpg","89f9eaca2434a45a5adf158f1b242141"],["image_6/image/7.jpg","725b66d5b21212b5bc490c311fc45b21"],["image_6/image/8.jpg","ca4c8b9c0bac8d9decac7c3d4976fca3"],["image_6/image/9.jpg","320ca9f349361c2fbdf87f0724dfcca6"],["image_7/image.jpeg","a48373dd2eeb4f3787bdf191041c0613"],["image_7/image/1.jpg","278745643ed49c6f25f10983185d7a43"],["image_7/image/2.jpg","26be0fff38a758908b7825645a7bd46b"],["image_7/image/3.jpg","eac1afbc48cdf373bcb45cf65b9a2880"],["image_7/image/4.jpg","d524320cb2cce2a52a6ec1007b27541e"],["image_7/image/5.jpg","255be024cfa0135881011c526705e489"],["image_7/image/6.jpg","831b045fea65f38a6dc85716f6c92a02"],["image_7/image/7.jpg","b5753c6426bbce263c5ce4e80c02628a"],["image_7/image/8.jpg","9a4861a1618d8978abb8cbd8b6860acd"],["image_7/image/9.jpg","e30d10b766eb2201ee29806011429891"],["image_8/image.jpeg","c6a189b4e95128b828a36de3aca4036e"],["image_8/image/1.jpg","9e66b6d1560bb80c6d17285101a85c18"],["image_8/image/2.jpg","467eb61462dd8febeece9366b3f680dc"],["image_8/image/3.jpg","284855fcb4eb4850bd8888e5520de13b"],["image_8/image/4.jpg","c9fc39b362a6fe22aacc75cd941d54ed"],["image_8/image/5.jpg","b54dd5b9f7afb770606b4576d7fa8bef"],["image_8/image/6.jpg","7dc57fc1d00463b8cb72cbbe56c602ad"],["image_8/image/7.jpg","43819d624abe72b4ca6b6a765455f4cb"],["image_8/image/8.jpg","32281fce50cf519b62bba18784620865"],["image_8/image/9.jpg","f3da07a7147ae0647a48e544bd9ddfc1"],["image_9/image.jpeg","ef52a5ad82ff1b2e0b4278e8ebfe98b0"],["image_9/image/1.jpg","dc0f3b099f6400ca11c6bd28e095ea50"],["image_9/image/2.jpg","53fb85baa3862a10c9cdb9558c8a3733"],["image_9/image/3.jpg","4b352d0c0c66dd0dae5f476247a6f7a9"],["image_9/image/4.jpg","7a33609556341b59ac8f975d927f0f27"],["image_9/image/5.jpg","e941ff125b280bc5b49b19d5f16771c6"],["image_9/image/6.jpg","9bba51941c7f1fd9f86b0df50412f0f4"],["image_9/image/7.jpg","78e2a2d23660390e57189e5096ae49eb"],["image_9/image/8.jpg","b290eef4e961c512ded687310e1662c2"],["image_9/image/9.jpg","93422ab80eec9b39818ceed87e6a8cf8"],["index.html","2cf434e4c274ee71a39d1ed011a787fc"],["manifest.json","ef7f0235ebb1eefda4ae0480d6a5ee72"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







