package name.nanek.lastcall.client;

import java.util.Date;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import com.google.gwt.dom.client.Element;
import com.google.gwt.user.client.Timer;
import com.google.gwt.user.client.rpc.AsyncCallback;
import com.google.gwt.user.client.ui.RootPanel;

public class GoogleIOContest2 implements EntryPoint {

	private final GreetingServiceAsync greetingService = GWT.create(GreetingService.class);
	
	public static final long MS_PER_SECOND = 1000;
	
	public static final long SECONDS_PER_MINUTE = 60;
	
	public static final long MINUTES_PER_HOUR = 60;
	
	public static final long HOURS_PER_DAY = 24;;
	
	public static final long MS_PER_MINUTE = SECONDS_PER_MINUTE * MS_PER_SECOND;
	
	public static final long MS_PER_HOUR = MINUTES_PER_HOUR * MS_PER_MINUTE;
	
	public static final long MS_PER_DAY = HOURS_PER_DAY * MS_PER_HOUR;
	
	private long targetTime;
	
	Element digitDaysHundredsElement;

	Element digitDaysTensElement;
	
	Element digitDaysOnesElement;
	
	Element digitHoursTensElement;
	
	Element digitHoursOnesElement;
	
	Element digitMinutesTensElement;
	
	Element digitMinutesOnesElement;
	
	Element digitSecondsTensElement;
	
	Element digitSecondsOnesElement;
	
	private Timer refreshDigitsTimer = new Timer() {
		@Override
		public void run() {
			setDigits();
		}
	};

	private void setDigit(Element element, long digit) {
		String newSrc = "images/digit_" + digit + ".png";
		String currentSrc = element.getAttribute("src");
		if (currentSrc.endsWith(newSrc)) {
			return;
		}
		element.setAttribute("src", newSrc);
	}

	private void setDigits() {
		long currentTime = new Date().getTime();
		long remainingTimeMs = targetTime - currentTime;
		
		if ( remainingTimeMs < 0 ) {
			remainingTimeMs = 0;
		}
		
		long days = remainingTimeMs / MS_PER_DAY;
		remainingTimeMs %= MS_PER_DAY;
		
		long hours = remainingTimeMs / MS_PER_HOUR;
		remainingTimeMs %= MS_PER_HOUR;
		
		long minutes = remainingTimeMs / MS_PER_MINUTE;
		remainingTimeMs %= MS_PER_MINUTE;
		
		long seconds = remainingTimeMs / MS_PER_SECOND;
				
		final long digitDaysHundreds = days/100;
		setDigit(digitDaysHundredsElement, digitDaysHundreds);
		final long digitDaysTens = (days - (digitDaysHundreds*100))/10;
		setDigit(digitDaysTensElement, digitDaysTens);
		final long digitDaysOnes = days - (digitDaysHundreds*100) - (digitDaysTens*10);
		setDigit(digitDaysOnesElement, digitDaysOnes);

		final long digitHoursTens = hours / 10;
		setDigit(digitHoursTensElement, digitHoursTens);
		setDigit(digitHoursOnesElement, hours - digitHoursTens*10);

		final long digitMinutesTens = minutes / 10;
		setDigit(digitMinutesTensElement, digitMinutesTens);
		setDigit(digitMinutesOnesElement, minutes - digitMinutesTens*10);

		final long digitSecondsTens = seconds / 10;
		setDigit(digitSecondsTensElement, digitSecondsTens);
		setDigit(digitSecondsOnesElement, seconds - digitSecondsTens*10);
	}
	
	public void onModuleLoad() {
		digitDaysHundredsElement = (Element) RootPanel.get("digitDaysHundreds").getElement();
		digitDaysTensElement = (Element) RootPanel.get("digitDaysTens").getElement();
		digitDaysOnesElement = (Element) RootPanel.get("digitDaysOnes").getElement();
		digitHoursTensElement = (Element) RootPanel.get("digitHoursTens").getElement();
		digitHoursOnesElement = (Element) RootPanel.get("digitHoursOnes").getElement();
		digitMinutesTensElement = (Element) RootPanel.get("digitMinutesTens").getElement();
		digitMinutesOnesElement = (Element) RootPanel.get("digitMinutesOnes").getElement();
		digitSecondsTensElement = (Element) RootPanel.get("digitSecondsTens").getElement();
		digitSecondsOnesElement = (Element) RootPanel.get("digitSecondsOnes").getElement();
		
		
		greetingService.getTargetTime(new AsyncCallback<Long>() {
			public void onFailure(Throwable caught) {
				System.out.println("error");
			}
			public void onSuccess(Long newTargetTime) {
				targetTime = newTargetTime;
				setDigits();
				refreshDigitsTimer.scheduleRepeating(1000);
			}
		});		
	}
}
