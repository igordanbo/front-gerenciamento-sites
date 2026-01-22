import { useLoading } from "../../context/LoadingContext";
import "./style.css";

export default function Loader() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="container-loader">
      <div class="spinner center">
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
        <div class="spinner-blade"></div>
      </div>{" "}
    </div>
  );
}
