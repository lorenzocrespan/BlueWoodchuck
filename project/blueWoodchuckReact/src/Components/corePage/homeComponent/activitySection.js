import { useEffect } from 'react';                    // React hooks.
import { BodyEntry, TitleEntry } from "./activityEntry";
import { useState } from "react";

import { createClient } from '@supabase/supabase-js'


function RecentActivity() {

    const [inputList, setInputList] = useState([]);

    const supabaseUrl = 'https://gnvpuxxfihgmnzydwzdn.supabase.co'
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdudnB1eHhmaWhnbW56eWR3emRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5MTg0NTQsImV4cCI6MTk5MjQ5NDQ1NH0.NprpJMRf9iscSwBEP9CJCW2TeehdTSgol4uNG_SvbgY"
    const supabase = createClient(supabaseUrl, supabaseKey)


    useEffect(() => {
        getIDsupabase();
    }, []);

    const getIDsupabase = async () => {
        try {
            let { data: Activity, error } = await supabase
                .from('Activity')
                .select('*')

            if (error) {
                throw error
            }

            if (Activity) {
                console.log("Activity")
                console.log(Activity)
            }
        } catch (error) {
            console.log('error', error.message)
        } finally {
            console.log("finally")
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
        <div className="container mx-auto sm:p-4 dark:text-gray-100 bg-blue-900 p-10 rounded-md">
            <h2 className="mb-4 text-2xl font-semibold leading-tight">Attività recenti</h2>

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
        </div>
    )
}

export default RecentActivity;