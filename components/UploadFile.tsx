import { PaperClipIcon } from "@heroicons/react/24/outline";

function App({ uploadFile }: { uploadFile?: any }) {
    return (
        <div onChange={(e) => uploadFile(e)} className="wrapper">
            <div className="file-upload">
                <PaperClipIcon height={100} width={100} />
                <input type="file" />
            </div>
        </div>
    );
}

export default App;
