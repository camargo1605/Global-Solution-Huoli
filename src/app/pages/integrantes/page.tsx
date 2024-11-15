import Image from "next/image";
import CaioM from "../../../images/CaioM.jpeg";
import Caioaio from "../../../images/Caioaio.jpeg";
import Felipe from "../../../images/Felipe.jpeg";

const Integrantes = () => {
    return (
        <div className="flex h-screen items-center flex-col space-y-8">
            <h1 className="text-4xl font-bold text-teal-700 my-8">1TDSR</h1>
            <div className="flex flex-wrap justify-center items-center gap-8 max-w-6xl mx-auto px-4">
                <div className="w-80 bg-white p-6 border-2 border-teal-700 rounded-lg shadow-lg flex flex-col items-center space-y-4">
                    <Image
                        src={CaioM}
                        width={150}
                        height={150}
                        alt="Caio Marques"
                        className="rounded-full border-4 border-teal-700"
                    />
                    <p className="text-lg font-semibold text-teal-700">Caio Marques</p>
                    <p className="text-md text-teal-600">RM 555997</p>
                    <div className="flex space-x-4">
                        <a
                            href="https://www.linkedin.com/in/caio-marques-8404512b6/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-lg hover:underline"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/CmarxS"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-lg hover:underline"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
                <div className="w-80 bg-white p-6 border-2 border-teal-700 rounded-lg shadow-lg flex flex-col items-center space-y-4">
                    <Image
                        src={Caioaio}
                        width={150}
                        height={150}
                        alt="Integrante 2"
                        className="rounded-full border-4 border-teal-700"
                    />
                    <p className="text-lg font-semibold text-teal-700">Caio Amarante Miranda Lima</p>
                    <p className="text-md text-teal-600">RM 558640</p>
                    <div className="flex space-x-4">
                        <a
                            href="https://www.linkedin.com/in/caioamarante/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-lg hover:underline"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/caioaml"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-lg hover:underline"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
                <div className="w-80 bg-white p-6 border-2 border-teal-700 rounded-lg shadow-lg flex flex-col items-center space-y-4">
                    <Image
                        src={Felipe}
                        width={130}
                        height={130}
                        alt="Integrante 3"
                        className="rounded-full border-4 border-teal-700"
                    />
                    <p className="text-lg font-semibold text-teal-700">Felipe Camargo Revolta e Souza</p>
                    <p className="text-md text-teal-600">RM 556325</p>
                    <div className="flex space-x-4">
                        <a
                            href="https://www.linkedin.com/in/felipe-camargo-389126318/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-lg hover:underline"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/camargo1605"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-lg hover:underline"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Integrantes;
