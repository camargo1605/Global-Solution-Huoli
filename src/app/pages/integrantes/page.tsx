import Image from "next/image";
import CaioM from "../../../images/CaioM.jpeg";
import Caioaio from "../../../images/Caioaio.jpeg";
import Felipe from "../../../images/Felipe.jpeg";

const Integrantes = () => {
    return (
        <div className="flex min-h-screen items-center flex-col space-y-8 bg-gradient-to-tr from-teal-700 to-blue-500 p-4">
            <h1 className="text-4xl font-bold text-teal-100 my-8">1TDSR</h1>
            <div className="flex flex-wrap justify-center items-center gap-8 max-w-6xl mx-auto px-4">
                {[{
                    name: 'Caio Marques',
                    image: CaioM,
                    rm: 'RM 555997',
                    linkedin: 'https://www.linkedin.com/in/caio-marques-8404512b6/',
                    github: 'https://github.com/CmarxS'
                },
                {
                    name: 'Caio Amarante Miranda Lima',
                    image: Caioaio,
                    rm: 'RM 558640',
                    linkedin: 'https://www.linkedin.com/in/caioamarante/',
                    github: 'https://github.com/caioaml'
                },
                {
                    name: 'Felipe Camargo Revolta e Souza',
                    image: Felipe,
                    rm: 'RM 556325',
                    linkedin: 'https://www.linkedin.com/in/felipe-camargo-389126318/',
                    github: 'https://github.com/camargo1605'
                }].map((integrante) => (
                    <div key={integrante.rm} className="w-full sm:w-80 bg-white p-6 border-2 border-teal-700 rounded-lg shadow-lg flex flex-col items-center space-y-4">
                        <Image
                            src={integrante.image}
                            width={150}
                            height={150}
                            alt={integrante.name}
                            className="rounded-full border-4 border-teal-700"
                        />
                        <p className="text-lg font-semibold text-teal-700">{integrante.name}</p>
                        <p className="text-md text-teal-600">{integrante.rm}</p>
                        <div className="flex space-x-4">
                            <a
                                href={integrante.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 text-lg hover:underline"
                            >
                                LinkedIn
                            </a>
                            <a
                                href={integrante.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 text-lg hover:underline"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Integrantes;
