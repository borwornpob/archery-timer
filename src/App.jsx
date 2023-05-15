import React, { useState, useEffect, useRef } from "react";

const QualificationRoundTimer = () => {
    const [seconds, setSeconds] = useState(10);
    const [end, setEnd] = useState(1);
    const [preparation, setPreparation] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [preparationTime, setPreparationTime] = useState(10);
    const [shootingTime, setShootingTime] = useState(90);
    const [numberOfEnds, setNumberOfEnds] = useState(10);
    const [isActive, setIsActive] = useState(true); //
    const timerId = useRef(null);

    useEffect(() => {
        if (end > numberOfEnds || isModalOpen || !isActive) {
            return; // End the timer after 10 ends or if settings are open or timer is not active
        }

        if (seconds > 0) {
            timerId.current = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timerId.current);
        } else {
            if (preparation) {
                setSeconds(shootingTime);
                setPreparation(false);
            } else {
                setSeconds(preparationTime);
                setPreparation(true);
                setEnd(end + 1);
            }
        }

        return () => clearTimeout(timerId.current);
    }, [
        seconds,
        end,
        preparation,
        isModalOpen,
        isActive,
        preparationTime,
        shootingTime,
        numberOfEnds,
    ]);

    const closeModal = () => {
        setIsModalOpen(false);
        setIsActive(true);
    };

    const openModal = () => {
        setIsModalOpen(true);
        clearTimeout(timerId.current);
        setSeconds(preparationTime);
        setPreparation(true);
        setEnd(1);
        setIsActive(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <button
                className="absolute top-4 right-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                onClick={openModal}
            >
                Settings
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 flex right-4 z-50">
                    <div className="bg-white rounded p-8 m-4 max-w-xs sm:m-8">
                        <h1 className="mb-4 text-xl font-bold">Settings</h1>
                        <div className="flex flex-col">
                            <label className="mb-2 font-bold text-lg">
                                Preparation Time
                            </label>
                            <input
                                className="border py-2 px-3 text-grey-darkest"
                                type="number"
                                value={preparationTime}
                                onChange={(e) =>
                                    setPreparationTime(parseInt(e.target.value))
                                }
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <label className="mb-2 font-bold text-lg">
                                Shooting Time
                            </label>
                            <input
                                className="border py-2 px-3 text-grey-darkest"
                                type="number"
                                value={shootingTime}
                                onChange={(e) =>
                                    setShootingTime(parseInt(e.target.value))
                                }
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <label className="mb-2 font-bold text-lg">
                                Number of Ends
                            </label>
                            <input
                                className="border py-2 px-3 text-grey-darkest"
                                type="number"
                                value={numberOfEnds}
                                onChange={(e) =>
                                    setNumberOfEnds(parseInt(e.target.value))
                                }
                            />
                        </div>
                        <button
                            className="mt-4 px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <div className="text-4xl font-bold">End: {end}</div>
            {preparation ? (
                <div className="text-9xl font-bold text-red-600">
                    {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? "0" : ""}
                    {seconds % 60}
                </div>
            ) : (
                <div className="text-9xl font-bol text-green-600">
                    {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? "0" : ""}
                    {seconds % 60}
                </div>
            )}
            <button
                className="mt-4 px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                onClick={() => {
                    setSeconds(preparationTime);
                    setEnd(1);
                    setPreparation(true);
                }}
            >
                Reset
            </button>
        </div>
    );
};

export default QualificationRoundTimer;
