import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationBarProps{
    totalPages : number;
    currentPage : number;
    setCurrentPage: (page: number) => void;
}

const PaginationBar = ({ totalPages, currentPage, setCurrentPage }: PaginationBarProps) => {
    return (
        <div className="mx-auto bg-white flex items-center gap-2 border rounded-lg w-fit p-2">
            {currentPage !== 1 &&
                <div 
                    className={`w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer`}
                    onClick={() => setCurrentPage(currentPage-1)}
                >
                    <ChevronLeft />
                </div>
            }
            {
                [...Array(totalPages)].map((_, index) => (
                    <div 
                        key={index} 
                        className={`w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer ${currentPage === index + 1 ? 'bg-gray-100' : ''}`}
                        onClick={() => setCurrentPage(index+1)}
                    >
                        {index + 1}
                    </div>
                ))
            }
            {currentPage !== totalPages &&
                <div 
                    className={`w-8 h-8 flex items-center justify-center rounded-4xl cursor-pointer`}
                    onClick={() => setCurrentPage(currentPage+1)}

                >
                    <ChevronRight />
                </div>
            }
        </div>
    )
}

export default PaginationBar