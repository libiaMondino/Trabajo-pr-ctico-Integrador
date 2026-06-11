import banner from "../assets/img/img/banner.png";
import "./Home.css";

function Home() {
    return (
        <div className="container-fluid p-0">

            {/* Banner */}
            <div className="banner-container">
                <img
                    src={banner}
                    alt="Banner principal"
                    className="banner-img"
                />

                <button className="banner-btn">
                    Ver instrumentos
                </button>
            </div>

            {/* Productos destacados */}
            <div className="container my-5">

                <h2 className="text-center mb-4">
                    Productos destacados
                </h2>

                <div className="row">

                    <div className="col-md-4">
                        <div className="card">
                            <img
                                src="https://placehold.co/300x200"
                                className="card-img-top"
                                alt="Producto"
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    Guitarra Fender
                                </h5>
                                <p className="card-text">
                                    $500.000
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <img
                                src="https://placehold.co/300x200"
                                className="card-img-top"
                                alt="Producto"
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    Piano Yamaha
                                </h5>
                                <p className="card-text">
                                    $1.200.000
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <img
                                src="https://placehold.co/300x200"
                                className="card-img-top"
                                alt="Producto"
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    Batería Pearl
                                </h5>
                                <p className="card-text">
                                    $900.000
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Home;