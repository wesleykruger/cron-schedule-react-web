import React, { useState } from 'react';
import { emptyStatement } from '@babel/types';
const fs = require('fs');
const readline = require('readline');

function ReadBtn() {

    return (
        <div>
            <input id="inputFileToLoad" type="file"/>
        </div>
    )
}

export default ReadBtn;