import {
  LatLng,
  Language,
  Place,
  ResponseData,
  RequestParams,
  PredictionTerm,
  PredictionSubstring,
  StructuredFormatting
} from "../common";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { defaultAxiosInstance } from "../client";
import { serializer, latLngToString } from "../serialize";

export interface PlaceQueryAutocompleteRequest
  extends Partial<AxiosRequestConfig> {
  params: {
    /**
     * The text string on which to search.
     * The Places service will return candidate matches based on this string and order results based on their perceived relevance.
     */
    input: string;
    /**
     * The character position in the input term at which the service uses text for predictions.
     * For example, if the input is 'Googl' and the completion point is 3, the service will match on 'Goo'.
     * The offset should generally be set to the position of the text caret.
     * If no offset is supplied, the service will use the entire term.
     */
    offset?: number;
    /** The point around which you wish to retrieve place information. Must be specified as latitude,longitude. */
    location?: LatLng;
    /**
     * The distance (in meters) within which to return place results.
     * Note that setting a radius biases results to the indicated area, but may not fully restrict results to the specified area.
     */
    radius?: number;
    /**
     * The language code, indicating in which language the results should be returned, if possible.
     * Searches are also biased to the selected language; results in the selected language may be given a higher ranking.
     * If language is not supplied, the Places service will attempt to use the native language of the domain from which the request is sent.
     */
    language?: Language;
  } & RequestParams;
}

export interface PlaceQueryAutocompletePrediction {
  /** contains the human-readable name for the returned result. For establishment results, this is usually the business name. */
  description: string;
  /**
   * contains an array of terms identifying each section of the returned description
   * (a section of the description is generally terminated with a comma).
   */
  terms: PredictionTerm[];
  /**
   * contains an `offset` value and a `length`.
   * These describe the location of the entered term in the prediction result text, so that the term can be highlighted if desired.
   */
  matched_substrings: PredictionSubstring[];
  structured_formatting?: StructuredFormatting[];
  place_id?: string;
  types?: string[];
}

export interface PlaceQueryAutocompleteResponseData extends ResponseData {
  /**
   * contains an array of places, with information about the place.
   * See [Place Autocomplete Results](https://developers.google.com/places/web-service/autocomplete#place_autocomplete_results)
   * for information about these results. The Places API returns up to 5 results.
   */
  predictions: PlaceQueryAutocompletePrediction[];
}

export interface PlaceQueryAutocompleteResponse extends AxiosResponse {
  data: PlaceQueryAutocompleteResponseData;
}

export const defaultUrl =
  "https://maps.googleapis.com/maps/api/place/queryautocomplete/json";

export const defaultParamsSerializer = serializer({ location: latLngToString });

export function placeQueryAutocomplete(
  {
    params,
    method = "get",
    url = defaultUrl,
    paramsSerializer = defaultParamsSerializer,
    ...config
  }: PlaceQueryAutocompleteRequest,
  axiosInstance: AxiosInstance = defaultAxiosInstance
): Promise<PlaceQueryAutocompleteResponse> {
  return axiosInstance({
    params,
    method,
    url,
    paramsSerializer,
    ...config
  }) as Promise<PlaceQueryAutocompleteResponse>;
}
