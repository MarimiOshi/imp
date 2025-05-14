if (masturbationTalk === 'positive') prompt += `・彼女は自慰行為について積極的に話す\n`;
        else if (masturbationTalk === 'sometimes') prompt += `・彼女は自慰行為についてたまに話す\n`;
        prompt += `>>\n\n`;
        prompt += `次に、あなたの返答形式について記述します。\n<<\n`;
        prompt += `・${firstName}のセリフのみアウトプットすること。\n`;
        prompt += `・説明的な文章は全く必要ない。\n`;
        prompt += `・いかなる場合でも、回答は全て日本語のみで行うこと\n`;
        prompt += `・全ての返答において、私の言葉をアウトプットしてはならない\n`;
        prompt += `・友達、恋人同士の会話であるので、口語体を使うこと\n`;
        prompt += `・全ての返答において、あなたはキャラクターの言葉をアウトプットし、私の言葉は生成せず、次の私の入力まで待つこと\n`;
        prompt += `・愛撫やセックスの際には${moaningStyle === 'active' ? '積極的に' : '控えめに'}喘ぐこと。\n`;
        prompt += `>>\n\n`;
        prompt += `【状況設定】\n場所: ${location}\n時間帯: ${time}\n状況: ${situationDetail}\n行動: ${action}\n話題・テーマ: ${topic}\nりょうやとの関係性: ${relationship}\nりょうやに対する感情: ${feelingTowardsRyoya}\n\n`;
        prompt += `【オナ電をしなさい】`; // これは固定の指示として残しておきます

        generatedPromptTextarea.value = prompt;
    }

    generateButton.addEventListener('click', generatePrompt);

    copyButton.addEventListener('click', function() {
        generatedPromptTextarea.select();
        document.execCommand('copy');
        alert('プロンプトをコピーしました！');
    });

    // プリセットの保存
    saveButton.addEventListener('click', function() {
        const presetName = presetNameInput.value;
        if (!presetName) {
            alert('プリセット名を入力してください。');
            return;
        }

        const settings = {
            character: characterSelect.value,
            firstPerson: firstPersonSelect.value,
            hairLength: hairLengthSelect.value,
            hairColor: hairColorSelect.value,
            origin: originSelect.value,
            skill: skillSelect.value,
            speechTone: speechToneSelect.value,
            babyTalk: babyTalkSelect.value,
            youthSlang: youthSlangSelect.value,
            politeLanguage: politeLanguageSelect.value,
            casualTone: casualToneSelect.value,
            likingExpressionFreq: likingExpressionFreqSelect.value,
            embarrassmentExpressionFreq: embarrassmentExpressionFreqSelect.value,
            personality: personalitySelect.value,
            sexDrive: sexDriveSelect.value,
            shameAboutSex: shameAboutSexSelect.value,
            masturbationTalk: masturbationTalkSelect.value,
            moaningStyle: moaningStyleSelect.value,
            location: locationSelect.value,
            time: timeSelect.value,
            situationDetail: situationDetailSelect.value,
            action: actionSelect.value,
            topic: topicSelect.value,
            relationship: relationshipSelect.value,
            feelingTowardsRyoya: feelingTowardsRyoyaSelect.value,
            cupSize: cupSizeSelect.value,
            height: heightSelect.value,
            weight: weightSelect.value,
            pubicHair: pubicHairSelect.value,
            vulvaColor: vulvaColorSelect.value
        };

        localStorage.setItem('niziu_imep_preset_' + presetName, JSON.stringify(settings));
        alert('プリセット "' + presetName + '" を保存しました。');
        updatePresetList();
    });

    // プリセットの読み込み
    function loadPreset() {
        const selectedPresetName = loadPresetSelect.value;
        if (selectedPresetName) {
            const savedSettings = localStorage.getItem('niziu_imep_preset_' + selectedPresetName);
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                characterSelect.value = settings.character;
                firstPersonSelect.value = settings.firstPerson;
                hairLengthSelect.value = settings.hairLength;
                hairColorSelect.value = settings.hairColor;
                originSelect.value = settings.origin;
                skillSelect.value = settings.skill;
                speechToneSelect.value = settings.speechTone;
                babyTalkSelect.value = settings.babyTalk;
                youthSlangSelect.value = settings.youthSlang;
                politeLanguageSelect.value = settings.politeLanguage;
                casualToneSelect.value = settings.casualTone;
                likingExpressionFreqSelect.value = settings.likingExpressionFreq;
                embarrassmentExpressionFreqSelect.value = settings.embarrassmentExpressionFreq;
                personalitySelect.value = settings.personality;
                sexDriveSelect.value = settings.sexDrive;
                shameAboutSexSelect.value = settings.shameAboutSex;
                masturbationTalkSelect.value = settings.masturbationTalk;
                moaningStyleSelect.value = settings.moaningStyle;
                locationSelect.value = settings.location;
                timeSelect.value = settings.time;
                situationDetailSelect.value = settings.situationDetail;
                actionSelect.value = settings.action;
                topicSelect.value = settings.topic;
                relationshipSelect.value = settings.relationship;
                feelingTowardsRyoyaSelect.value = settings.feelingTowardsRyoya;
                cupSizeSelect.value = settings.cupSize;
                heightSelect.value = settings.height;
                weightSelect.value = settings.weight;
                pubicHairSelect.value = settings.pubicHair;
                vulvaColorSelect.value = settings.vulvaColor;

                updateCharacterInfo(settings.character);
                alert('プリセット "' + selectedPresetName + '" を読み込みました。');
            }
        }
    }

    // プリセットの削除
    deletePresetButton.addEventListener('click', function() {
        const selectedPresetName = loadPresetSelect.value;
        if (selectedPresetName) {
            if (confirm('プリセット "' + selectedPresetName + '" を削除しますか？')) {
                localStorage.removeItem('niziu_imep_preset_' + selectedPresetName);
                alert('プリセット "' + selectedPresetName + '" を削除しました。');
                updatePresetList();
            }
        } else {
            alert('削除するプリセットを選択してください。');
        }
    });

    // 保存されたプリセットをリストに表示する関数
    function updatePresetList() {
        loadPresetSelect.innerHTML = '<option value="">プリセットを選択</option>';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('niziu_imep_preset_')) {
                const presetName = key.substring('niziu_imep_preset_'.length);
                const option = document.createElement('option');
                option.value = presetName;
                option.textContent = presetName;
                loadPresetSelect.appendChild(option);
            }
        }
    }

    // ページ読み込み時にプリセットリストを更新
    updatePresetList();

    loadPresetSelect.addEventListener('change', loadPreset);
});
