/*

Live Coding using Patterns in ProxySpace

An adapted, expounded, and self-contained version of theseanco's tutorial at https://theseanco.github.io/howto_co34pt_liveCode/2-2-Why-ProxySpace/

[theseanco]'s more personal notes notated as such

*/

// A few quarks will help us along the way
(
Quarks.install("Bjorklund");
Quarks.install("BatLib");
Quarks.install("ddwSnippets");
Quarks.install("JITLibExtensions");
)

(
s.boot;
//start proxyspace
p=ProxySpace.push(s);
//start tempo clock
p.makeTempoClock;
//give proxyspace a tempo
p.clock.tempo = 2;

//Define ourselves a synth to make some noise
SynthDef(\bplay,
	{arg out = 0, buf = 0, rate = 1, amp = 0.5, pan = 0, pos = 0, rel=15;
		var sig,env ;
		sig = Mix.ar(PlayBuf.ar(2,buf,BufRateScale.ir(buf) * rate,1,BufDur.kr(buf)*pos*44100,doneAction:2));
		env = EnvGen.ar(Env.linen(0.0,rel,0),doneAction:2);
		sig = sig * env;
		sig = sig * amp;
		Out.ar(out,Pan2.ar(sig,pan));
}).add;

//load some drum samples into a global Dictionary 'd'
s.waitForBoot({
	d = Dictionary.new;
	d.add(\foldernames -> PathName(thisProcess.nowExecutingPath.dirname +/+ "samples/set1").entries);
	for (0, d[\foldernames].size-1,
		{arg i; d.add(d[\foldernames][i].folderName -> d[\foldernames][i].entries.collect({
			arg sf;
			Buffer.read(s,sf.fullPath);
		});
	)});

	DDWSnippets.put("kick", "~k = Pbind(\\instrument,\\bplay,\\buf,d[\"k\"][0],\\dur,##1##,\\amp,1);");
	DDWSnippets.put("hat","~h = Pbind(\\instrument,\\bplay,\\buf,d[\"ch\"][0],\\dur,##0.25##,\\amp,Pexprand(0.05,1));");
	DDWSnippets.put("snare","~sn = Pbind(\\instrument,\\bplay,\\buf,d[\"s\"][0],\\dur,##2##,\\amp,1);");
});

//It is hard to keep track of levels yourself when you are live coding
//StageLimiter (from BatLib) will take care of this for you
//Note that this is a creative choice
StageLimiter.activate;

)
//Patterns can also be written directly into ProxySpace. They will be synced to ProxySpace's TempoClock
//The tempoclock is initialised at setup by p.makeTempoClock
//The speed of the clock is controlled by modifying this value
p.clock.tempo = 1

//start a basic kick drum pattern
~k = Pbind(\instrument,\bplay,\buf,d["k"][0],\dur,1,\amp,1);
~k.play;

//start a basic snare pattern
~sn = Pbind(\instrument,\bplay,\buf,d["s"][0],\dur,2,\amp,1);
~sn.play;

//start a basic hi-hat pattern
~h = Pbind(\instrument,\bplay,\buf,d["ch"][0],\dur,0.25,\amp,Pwhite(0.2,1));
~h.play;

//double the clock speed.
p.clock.tempo = 2

//with p.clock.tempo at 2, one full cyle in the 'dur' argument of patterns happens twice a second, making the BPM 120
//You can get the BPM value of p.clock.tempo by multiplying it by 60
//You can also do this to set the tempo clock by BPM
p.clock.tempo = 135/60

//Extremely high clock speeds will result in extratone-like drums
p.clock.tempo = 20

//anyway...
p.clock.tempo = 135/60

//Patterns can also have fades applied to them, much like the function proxies in the Proxy basics tutorial
p.fadeTime = 4;

//hear what fades sound like on patterns, either run these one at a time (shift+return) or all at once (ctrl+return)
(
~h = Pbind(\instrument,\bplay,\buf,d["ch"][1],\dur,Pwrand([0.25,Pseq([0.125],2)],[0.8,0.2],inf),\amp,Pwhite(0.2,1));
~sn = Pbind(\instrument,\bplay,\buf,d["s"][0],\dur,Pbjorklund2(5,16)/4,\amp,1);
~k = Pbind(\instrument,\bplay,\buf,d["k"][0],\dur,Pbjorklund2(3,8)/4,\amp,1);
)

//Note how all the proxies have stayed in time with one-another no problem. This 'just works'.
//[theseanco] I've experimented with using Pdefs in the past, and never managed to get them to quite sync up, or i've had issues syncing Pdefs together.

//let's make things a little less intense
(
~h = Pbind(\instrument,\bplay,\buf,d["ch"][0],\dur,Pwrand([0.25,Pseq([0.125],2)],[0.8,0.2],inf),\amp,Pwhite(0.2,1));
~k = Pbind(\instrument,\bplay,\buf,d["k"][0],\dur,1,\amp,1);
~sn = Pbind(\instrument,\bplay,\buf,d["s"][0],\dur,2,\amp,1)
)

//You can also use Pbinds to specify melodies
//First, we need a synth that can play melodies
(
SynthDef(\ring1,
	{
		arg f = 45, a = 9, d = 0.6, pan = 0, amp = 1, out = 0;
		var sig, env;
		env = Line.kr(0,1,d);
		env = FreeSelfWhenDone.kr(env);
		sig = Impulse.ar(0);
		sig = Ringz.ar(sig,f,d,a);
		Out.ar(out,Pan2.ar(sig.tanh,pan) * amp)
	};
).add;
)
(
~ring1 = Pbind(\instrument,\ring1,
	           \f,Pkey(\freq),
	           \scale,Scale.minor,
	           \root,0,
	           \degree,0,
	           \octave,5,
	           \dur,1,
	           \d,0.3, //delay
	           \a,0.6, //attack
	           \pan,0,
	           \amp,1);
~ring1.play;
)

//The beauty of using patterns inside of ProxySpace is that you can build them up element by element, and evaluate as often as you want, building complexity during performance in a way that you and an audience can hear.

//We can change one part of this at a time
(~ring1 = Pbind(\instrument,\ring1,
	           \f,Pkey(\freq),
	           \scale,Scale.minor,
	           \root,0,
	           \degree,Pseq([0,2,4,6,7],inf),
	           \octave,5,
	           \dur,1,
	           \d,0.3,
	           \a,0.6,
	           \pan,0,
	           \amp,1);
)


//A lot of live coding performances have a 'build-up/build-down' shape.
//For example, we might iteratively change one aspect of the proxy at a time

(~ring1 = Pbind(\instrument,\ring1,
	           \f,Pkey(\freq),
	           \scale,Scale.minor,
	           \root,0,
	           \degree,Pseq([0,2,4,6,7],inf),
	           \octave,5,
	           \dur,1,
	           \d,0.3,
	           \a,Pexprand(0.6,10), //varying attack
	           \pan,0,
	           \amp,1);
)

(~ring1 = Pbind(\instrument,\ring1,
	           \f,Pkey(\freq),
	           \scale,Scale.minor,
	           \root,0,
	           \degree,Pseq([0,2,4,6,7],inf),
	           \octave, Pwrand([5,4,3],[0.6,0.2,0.2],inf), //varying octave
	           \dur,1,
	           \d,0.3,
	           \a,Pexprand(0.6,10),
	           \pan,0,
	           \amp,1);
)

(~ring1 = Pbind(\instrument,\ring1,
	           \f,Pkey(\freq),
	           \scale,Scale.minor,
	           \root,0,
	           \degree,Pseq([0,2,4,6,7],inf),
	           \octave, Pwrand([5,4,3],[0.6,0.2,0.2],inf),
	           \dur,0.25, //lets speed it up
	           \d,0.3,
	           \a,Pexprand(0.6,10),
	           \pan,0,
	           \amp,1);
)

(~ring1 = Pbind(\instrument,\ring1,
	           \f,Pkey(\freq),
	           \scale,Scale.minor,
	           \root,0,
	           \degree,Pseq([0,2,4,6,7],inf),
	           \octave, Pwrand([5,4,3],[0.6,0.2,0.2],inf),
	           \dur,0.25,
	           \d,Pexprand(0.3,2), //add some random delay
	           \a,Pexprand(0.6,10),
	           \pan,0,
	           \amp,1);
)

//As you can probably imagine, things can get pretty complicated, but let's keep going.

//So far we're running all patterns, but the beauty of ProxySpace means we can run function (in this case, a synth) proxies alongside pattern proxies
(
~sines = {SinOscFB.ar([36.midicps,48.midicps+1],SinOsc.kr(0.1).range(0.1,1),0.8)};
~sines.play;
)


//You can also use function proxies to effect patterns.
//Let's first take a new sound
((
SynthDef(\sinfb, {
	arg freq = 440, atk = 0.01, sus = 0, rel = 1, fb = 0, amp = 0.3, out = 0, pan=0;
	var sig, env;
	env = EnvGen.ar(Env.linen(atk,sus,rel),1,1,0,1,2);
	sig = SinOscFB.ar(freq,fb,1);
	sig = sig*env;
	Out.ar(out,Pan2.ar(sig,pan,amp));
}).add;
);
)

//Create a pattern proxy to play this sound
~sinfb = Pbind(\instrument,\sinfb,\degree,0,\octave,6,\dur,0.25,\amp,0.7,\fb,0.1)
~sinfb.play

//then create a Control Rate proxy to control that pattern
~sinfbControl = {SinOsc.kr(0.1).range(0.1,1.5)}

//then set an argument on the pattern against the control rate proxy
~sinfb.set(\fb,~sinfbControl)

//And you can chain pattern proxies too

//let's add reverb to ~ring
~verb = {FreeVerb.ar(~ring1,1)}
~verb.play

//and make the reverb ridiculous
//you really want StageLimiter on if you do this
~verb = {FreeVerb.ar(~ring1,1,1,0.1)}

//and cut the percussion for some ambience
(
~k.stop;
~sn.stop;
~h.stop;
)

//and make another sinfb pattern a fifth above the old one for more ambience
~sinfb2 = Pbind(\instrument,\sinfb,\degree,4,\octave,6,\dur,0.25,\amp,0.7,\fb,0.1)
~sinfb2.play

//make sure it has the control proxy assigned to it too! Or, make another control proxy to get two alternating washes of feedback
~sinfbControl2 = {SinOsc.kr(0.11).range(0.1,1.5)}
~sinfb2.set(\fb,~sinfbControl2)

//slow the whole thing down a little
p.clock.tempo = 120/60

//super loud kick for the head-nodders out there...
(
~k = Pbind(\instrument,\bplay,\buf,d["k"][2],\dur,1,\amp,10);
~k.play;
)

//percussion crossrhythm
(
~p = Pbind(\instrument,\bplay,\buf,d["ding"][0],\dur,0.75,\amp,1);
~p.play;
)

//raise the tempo because people had time to go to the bar during the ambient section and now people want to dance
p.clock.tempo = 135/60

//and so on, and so on...

//Oh, you want to do some mixing?
//cool, tweak volumes here
//You can even record using this if you have the JITLibExtensions quark
//[theseanco] I don't do this much myself during sets but it's worth knowing about
ProxyMixer.new(p)

//note that you can also do this for individual proxies by specifying this argument. It defaults to 1
~sn.vol = 0.1;

~k.vol = 3;

~sines.vol = 0.5;

//start, stop and modify proxies to your heart's content, change the volumes on the ProxyMixer as you wish, and don't forget to free your proxies when done with them!

//when you're finished
(
~k.clear;
~sn.clear;
~h.clear;
~sines.clear;
~ring1.clear;
~p.clear;
~sinfb.clear;
~sinfb2.clear;
Tdef(\task).stop;
)

//or
(
p.clear;
Server.hardFreeAll;
)