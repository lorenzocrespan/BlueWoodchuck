// Import - React
import { useEffect, useState } from 'react';
// Import - Components
import EmptyActivity from "./activityEmpty";
import { BodyEntry, TitleEntry } from "./activityEntry";
// Import - Supabase
import { createClient } from '@supabase/supabase-js'

function RecentActivity() {

    // Enable/Disable console debug.
    const isConsoleActive = false;
    // Supabase connection variables.
    const supabaseUrl = 'https://gnvpuxxfihgmnzydwzdn.supabase.co'
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdudnB1eHhmaWhnbW56eWR3emRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5MTg0NTQsImV4cCI6MTk5MjQ5NDQ1NH0.NprpJMRf9iscSwBEP9CJCW2TeehdTSgol4uNG_SvbgY"
    const supabase = createClient(supabaseUrl, supabaseKey)
    // Variable to store the list of activities from the database.
    const [inputList, setInputList] = useState([]);

    useEffect(() => {
        getIDsupabase();
    }, []);

    const getIDsupabase = async () => {
        try {
            let { data: Activity, error } = await supabase.from('Activity').select('*')
            if (error) throw error
            if (Activity) {
                console.log("Activity")
                console.log(Activity)
            }
        } catch (error) {
            console.log('error', error.message)
        }
    }

    const onAddBtnClick = event => {
        console.log("Add button clicked");
        setInputList(inputList.concat(
            <BodyEntry
                key={inputList.length}
                id={inputList.length}
            />));
    };

    return (
        <div className="container mx-auto text-gray-100 bg-blue-900 p-12 rounded-md">
            <h2 className="mb-4 text-2xl font-semibold leading-tight">Attività recenti</h2>
            {
                inputList.length === 0 ?
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-xs">
                            <thead className=''>
                                <TitleEntry />
                            </thead>
                            <tbody>
                                {inputList}
                            </tbody>
                        </table>
                    </div>
                    :
                    <EmptyActivity
                        textSection="Non è stata trovata alcuna attività recente."
                    />
            }
        </div>
    )
}

export default RecentActivity;