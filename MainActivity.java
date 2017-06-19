package com.example.mark.myapplication;

import android.content.res.AssetFileDescriptor;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import android.media.MediaPlayer;
import android.media.MediaPlayer.OnCompletionListener;

public class MainActivity extends AppCompatActivity {

    private MediaPlayer mp;
    private Button btn_play;
    private Button btn_pause;

    //synthesis variables
    private boolean pauseReq_event;
    private boolean btn_play_event;
    private boolean btn_pause_event;

    @RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btn_play = (Button) findViewById(R.id.buttonstart);
        btn_pause = (Button) findViewById(R.id.buttonpause);

        mp = new MediaPlayer();
        mp.setOnCompletionListener(new OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mediaPlayer) {
                loadSong();
                mp.start();
            }
        });
        loadSong();

        btn_play.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View arg0) {
                btn_play_event = true;
                frpSynth(pauseReq_event, btn_play_event, btn_pause_event);
                btn_play_event = true;
            }
        });

        btn_pause.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View arg0) {
                // check for already playing
                btn_pause_event = true;
                frpSynth(pauseReq_event, btn_play_event, btn_pause_event);
                btn_pause_event = true;
            }
        });

    }

    @Override
    public void onPause() {
        super.onPause();
        pauseReq_event = true;
        frpSynth(pauseReq_event, btn_play_event, btn_pause_event);

    }

    @Override
    public void onResume() {
        super.onResume();
        pauseReq_event = false;
        frpSynth(pauseReq_event, btn_play_event, btn_pause_event);

    }

    private void frpSynth(boolean pauseReq_event, boolean btn_play_event, boolean btn_pause_event) {
        //sythesized code goes here
        //[[music <- play()]] = mp.start()
        //[[music <- pause()]] = mp.pause
    }


    public void loadSong() {
        try {
            AssetFileDescriptor afd = getAssets().openFd("song.mp3");

            mp.reset();
            mp.setDataSource(afd);
            mp.prepare();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}


